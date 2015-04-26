var express = require("express");
var blogRouter = express.Router();
var mongoskin = require("mongoskin");
var dbConnection = require("./../db/config.js").dbConnection;
var auth = require("./../middleware/auth.js");

blogRouter.param('collectionName', function(request, response, next) {
    request.collection = dbConnection.collection(request.baseUrl.replace("/", ""));
    return next();
});

blogRouter.get("/:collectionName", function(request, response) {
    request.collection.find().toArray(function(error, results) {
        response.send(results);
    });
});

blogRouter.get("/:collectionName/:id", function(request, response) {
    request.collection.findOne({_id: mongoskin.helper.toObjectID(request.params.id)}, function(error, results) {
        response.send(results);
    })
});

blogRouter.post("/:collectionName", auth, function(request, response) {
    request.collection.insert(request.body, function(error, results) {
        if (results) {
            response.send("Added");
        }
    });
});

blogRouter.delete("/:collectionName/:id", auth, function(request, response) {
    request.collection.remove({_id: mongoskin.helper.toObjectID(request.params.id)}, function(error, results) {
        response.sendStatus(200);
    });
});

blogRouter.put("/:collectionName/:id", auth, function(request, response) {
    var id = mongoskin.helper.toObjectID(request.params.id);
    delete request.body._id;
    request.collection.update({_id: id}, request.body, function(error, results) {
        response.sendStatus(200);
    });
});

module.exports = blogRouter;