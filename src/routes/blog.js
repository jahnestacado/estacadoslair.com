var express = require("express");
var blogRouter = express.Router();
var mongoskin = require("mongoskin");
var dbConnection = require("./../db/config.js").dbConnection;
var auth = require("./../middleware/auth.js");
var blogCollection = dbConnection.collection("blog");
var path = "/articles";

blogRouter.get(path, function(request, response) {
    blogCollection.find().toArray(function(error, results) {
        response.send(results);
    });
});

blogRouter.get(path + "/:id", function(request, response) {
    blogCollection.findOne({_id: mongoskin.helper.toObjectID(request.params.id)}, function(error, results) {
        response.send(results);
    });
});

blogRouter.post(path, auth, function(request, response) {
    blogCollection.insert(request.body, function(error, results) {
        if (results) {
            response.send("Added");
        }
    });
});

blogRouter.delete(path + "/:id", auth, function(request, response) {
    blogCollection.remove({_id: mongoskin.helper.toObjectID(request.params.id)}, function(error, results) {
        response.sendStatus(200);
    });
});

blogRouter.put(path + "/:id", auth, function(request, response) {
    var id = mongoskin.helper.toObjectID(request.params.id);
    delete request.body._id;
    blogCollection.update({_id: id}, request.body, function(error, results) {
        response.sendStatus(200);
    });
});

module.exports = blogRouter;
