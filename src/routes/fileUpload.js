var express = require("express");
var uploadFileRouter = express.Router();
var fs = require("fs");
var path = require("path");
var multer = require("multer");
var storagePath = process.env.STORAGE_DIR || "./public/images/uploads"
var upload = multer({ dest: storagePath});
var auth = require("./../middleware/auth.js");

uploadFileRouter.post("/", upload.array("uploaded-files", 20), function(request, response) {
    var fileInfos = request.files;
    var errors = [];
    if(fileInfos){
        fileInfos.forEach(function(fileInfo){
            fs.rename(fileInfo.path, path.join(fileInfo.destination,fileInfo.originalname), function(error){
                if(error){
                    errors.push(error);
                }
            });
        });

        if(errors.length){
            response.status(500).json(errors);
        } else{
            response.sendStatus(200);
        }
    }
});

module.exports = uploadFileRouter;
