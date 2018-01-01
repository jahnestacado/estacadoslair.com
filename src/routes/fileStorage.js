var express = require("express");
var fileStorageRouter = express.Router();
var fs = require("fs");
var path = require("path");
var multer = require("multer");
var fileStoragePath = process.env.UPLOADS_DIR || "./public/images/uploads";
var upload = multer({ dest: fileStoragePath});
var auth = require("./../middleware/auth.js");
var fileStorageCollectionUtils = require("./../db/file-storage-collection-utils.js");
var auth = require("./../middleware/auth.js");
var log = require("logia")("ROUTES::FILE-STORAGE");

var storage = multer.diskStorage({
    destination: fileStoragePath,
    filename: function(request, file, next) {
        var extension = file.originalname.match(/.*\.(.*)$/)[1];
        next(null, file.originalname.replace("." + extension, "-"+ Date.now() +"." + extension));
    }
});
var upload = multer({ storage: storage});

fileStorageRouter.post("/", auth, upload.array("uploaded-files", 20), function(request, response) {
    var filenames = request.files.map(function(file){
        return file.filename;
    });
    fileStorageCollectionUtils.insertFiles(filenames, function(error){
        if(error) {
            log.error("post('/') - insertFiles: {0} -> 204 {1}", filenames, error.message);
            response.status(204).json(error);
        } else {
            log.info("post('/') - insertFiles: {0} -> 201", filenames);
            response.status(201).json(filenames);
        }
    });
});

fileStorageRouter.get("/", function(request, response) {
    fs.readdir(fileStoragePath, function(error, list){
        if(error){
            log.error("get('/') - fs.readdir: {0} -> 500 {1}", fileStoragePath, error.message);
            response.status(500).json(error);
        } else {
            log.info("get('/') - fs.readdir: {0} -> 200 {1}", fileStoragePath, list);
            response.status(200).json(list);
        }
    });
});

fileStorageRouter.delete("/:filename", auth, function(request, response) {
    var filename = request.params.filename;
    fileStorageCollectionUtils.removeFile(filename, function(error){
        if(error) {
            log.error("delete('/{0}') - removeFile: {0} -> 500 {1}", filename, error.message);
            response.status(500).json(error);
        } else {
            log.info("delete('/{0}') -> 200", filename);
            response.status(200).json(filename);
        }
    });
});

module.exports = fileStorageRouter;
