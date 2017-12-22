var bus = require("hermes-bus");
var fs = require("fs");
var mongoskin = require("mongoskin");
var path = require("path");
var fileStoragePath = process.env.STORAGE_DIR || "./public/images/uploads";
var lockFilePath = path.join(fileStoragePath, ".lockfile");
var fileStorageCollection;

var Utils = {
    insertFiles: function(filenames, onDone) {
        var promises = [];
        var fileEntries = [];
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
            fileStorageCollection.insertMany(fileEntries, function(error){
                error ? onDone(error) : onDone();
            });
        });
    },
    syncFileStorageDir: function() {
        bus.subscribe("db", {
            onDatabaseReady: function(db) {
                if(!Utils.isfileStoragePathLocked()) {
                    fileStorageCollection = db.collection("file-storage");
                    fileStorageCollection.find().toArray(function(error, fileEntries) {
                        if(error) {
                            console.error(error);
                        } else {
                            var promises = [];
                            fileEntries.length && fs.writeFile(lockFilePath, function(error) {
                                if(error) {
                                    console.error(error);
                                } else {
                                    fileEntries.forEach(function(entry) {
                                        promises.push(new Promise(function(resolve) {
                                            var filePath = path.join(fileStoragePath, entry.name);
                                            fs.access(filePath, function(error){
                                                if(error){
                                                    // File doesn't exist hence we create it
                                                    fs.writeFile( filePath, entry.data.buffer, function(error) {
                                                        error && console.error(error); // we do not reject 
                                                        resolve();
                                                    });
                                                } else {
                                                    resolve();
                                                }
                                            });
                                        }));
                                    });
                                    
                                    Promise.all(promises).then(function(){
                                        fs.unlink(lockFilePath, function(error) {
                                            error && console.error(error);
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
        return isLocked;
    }
};

module.exports = Utils;
