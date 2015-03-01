var express = require("express");
var mongoskin = require("mongoskin");
var mongoUrl = process.env.MONGO || "localhost:27017";
var db = mongoskin.db("mongodb://" + mongoUrl + "/mywebsite");
var router = express.Router();

router.param('collectionName', function(request, response, next) {
    request.collection = db.collection(request.baseUrl.replace("/", ""));
    return next();
});

router.get("/:collectionName", function(request, response) {
    request.collection.find().toArray(function(error, results) {
        response.send(results);
    });
});

router.get("/:collectionName/:id", function(request, response) {
    request.collection.findOne({_id: mongoskin.helper.toObjectID(request.params.id)}, function(error, results) {
        response.send(results);
    });
});

router.post("/:collectionName", function(request, response) {
    request.collection.insert(request.body, function(error, results) {
        if (results) {
            response.send("Added");
        }
    });
});

router.delete("/:collectionName/:id", function(request, response) {
    request.collection.remove({_id: mongoskin.helper.toObjectID(request.params.id)}, function(error, results) {
        response.sendStatus(200);
    });
});

router.put("/:collectionName/:id", function(request, response) {
    var id = mongoskin.helper.toObjectID(request.params.id);
    delete request.body._id;
    request.collection.update({_id: id}, request.body, function(error, results) {
        response.sendStatus(200);
    });
});

module.exports = router;