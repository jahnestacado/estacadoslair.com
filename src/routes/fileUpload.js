var express = require("express");
var uploadFileRouter = express.Router();
var fs = require("fs");
var path = require("path");
var multer = require("multer");
var uploadsPath = process.env.UPLOADS_DIR || "./public/images/uploads";
var upload = multer({ dest: uploadsPath});
var auth = require("./../middleware/auth.js");
var uploadCollectionUtils = require("./../db/uploads-collection-utils.js");

var storage = multer.diskStorage({
    destination: uploadsPath,
    filename: function(request, file, next) {
        var extension = file.originalname.match(/.*\.(.*)$/)[1];
        next(null, file.originalname.replace("." + extension, "-"+ Date.now() +"." + extension));
    }
});
var upload = multer({ storage: storage});

uploadFileRouter.post("/", upload.array("uploaded-files", 20), function(request, response) {
    var filenames = request.files.map(function(file){
        return file.filename;
    });
    uploadCollectionUtils.insertFiles(filenames, function(error){
        if(error) {
            response.status(204).json(error);
        } else {
            response.status(201).json(filenames);
        }
    });
});

uploadFileRouter.get("/", function(request, response) {
    fs.readdir(uploadsPath, function(error, list){
        if(error){
            response.status(500).json(error);
        } else {
            response.status(200).json(list);
        }
    });
});

module.exports = uploadFileRouter;
