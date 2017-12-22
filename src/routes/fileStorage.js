var express = require("express");
var fileStorageRouter = express.Router();
var fs = require("fs");
var path = require("path");
var multer = require("multer");
var fileStoragePath = process.env.UPLOADS_DIR || "./public/images/uploads";
var upload = multer({ dest: fileStoragePath});
var auth = require("./../middleware/auth.js");
var fileStorageCollectionUtils = require("./../db/file-storage-collection-utils.js");

var storage = multer.diskStorage({
    destination: fileStoragePath,
    filename: function(request, file, next) {
        var extension = file.originalname.match(/.*\.(.*)$/)[1];
        next(null, file.originalname.replace("." + extension, "-"+ Date.now() +"." + extension));
    }
});
var upload = multer({ storage: storage});

fileStorageRouter.post("/", upload.array("uploaded-files", 20), function(request, response) {
    var filenames = request.files.map(function(file){
        return file.filename;
    });
    fileStorageCollectionUtils.insertFiles(filenames, function(error){
        if(error) {
            response.status(204).json(error);
        } else {
            response.status(201).json(filenames);
        }
    });
});

fileStorageRouter.get("/", function(request, response) {
    fs.readdir(fileStoragePath, function(error, list){
        if(error){
            response.status(500).json(error);
        } else {
            response.status(200).json(list);
        }
    });
});

module.exports = fileStorageRouter;
