var bus = require("hermes-bus");
var fs = require("fs");
var mongoskin = require("mongoskin");
var path = require("path");
var fileStoragePath = process.env.STORAGE_DIR || "./public/images/uploads";
var lockFilePath = path.join(fileStoragePath, ".lockfile");
var log = require("logia")("DB::FILE-STORAGE-COLLECTION-UTILS");
var fileStorageCollection;

var Utils = {
    insertFiles: function(filenames, onDone) {
        var promises = [];
        var fileEntries = [];
        log.info("insertFiles {0}",filenames);
        filenames.forEach(function(filename) {
            promises.push(new Promise(function(resolve) {
                fs.readFile(path.join(fileStoragePath, filename), function(error, data) {
                    var fileEntry = {
                        name: filename,
                        data: mongoskin.Binary(data)
                    };
                    resolve(fileEntry);
                });
            }));
        });
        
        Promise.all(promises).then(function(fileEntries) {
            log.trace("insertFile - inserting many fileEntries: {0}", fileEntries)
            fileStorageCollection.insertMany(fileEntries, function(error){
                error ? onDone(error) : onDone();
            });
        });
    },
    removeFile: function(filename, onDone) {
        log.debug("removeFile - unlink {0}", path.join(fileStoragePath, filename));
        fs.unlink(path.join(fileStoragePath, filename), function(error) {
            var fileEntry = {name: filename};
            log.info("removeFile {0}", filename);
            fileStorageCollection.remove(fileEntry, function(error){
                error ? onDone(error) : onDone();
            });
        });
    },
    syncFileStorageDir: function() {
        log.info("subscribing syncFileStorageDir onDatabaseReady listener");
        bus.subscribe("db", {
            onDatabaseReady: function(db) {
                if(!Utils.isfileStoragePathLocked()) {
                    fileStorageCollection = db.collection("file-storage");
                    fileStorageCollection.find().toArray(function(error, fileEntries) {
                        if(error) {
                            log.error("syncFileStorageDir- find: {0}", error.message);
                        } else {
                            var promises = [];
                            fileEntries.length && fs.writeFile(lockFilePath, function(error) {
                                if(error) {
                                    log.error("syncFileStorageDir- creating lockfile: {0}", error.message);
                                } else {
                                    fileEntries.forEach(function(entry) {
                                        promises.push(new Promise(function(resolve) {
                                            var filePath = path.join(fileStoragePath, entry.name);
                                            fs.access(filePath, function(error){
                                                if(error){
                                                    // File doesn't exist hence we create it
                                                    log.debug("syncFileStorageDir - file: {0} doesn't exist, hence creating it...", filePath);
                                                    fs.writeFile( filePath, entry.data.buffer, function(error) {
                                                        error && log.error("syncFileStorageDir - writefile: {0}", error.message); // we do not reject 
                                                        resolve();
                                                    });
                                                } else {
                                                    log.debug("syncFileStorageDir - file: {0} exists, hence not creating...", filePath);
                                                    resolve();
                                                }
                                            });
                                        }));
                                    });
                                    
                                    Promise.all(promises).then(function(){
                                        log.info("syncFileStorageDir - deleted lockfile");
                                        fs.unlink(lockFilePath, function(error) {
                                            error && log.error("syncFileStorageDir: {0}", error.message);
                                        });
                                    });
                                }
                            });
                        }
                    });
                }
            }
        });
    },
    isfileStoragePathLocked: function() {
        var isLocked = true;
        try {
            fs.accessSync(lockFilePath);
        } catch(error) {
            isLocked = false;
        }
        log.info("isfileStoragePathLocked {0}", isLocked);
        return isLocked;
    }
};

module.exports = Utils;
