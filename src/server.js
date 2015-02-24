var express = require("express");
var mongoskin = require("mongoskin");
var bodyParser = require("body-parser");
var db = mongoskin.db("mongodb://localhost:27017/blog");

var app = express();
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
console.log(__dirname + "../public");
app.use(express.static(__dirname + "/../public"));

app.param('collectionName', function(request, response, next, collectionName) {
    request.collection = db.collection('articles')
    return next()
});

app.get("/blog/:collectionName", function(request, response) {
    request.collection.find().toArray(function(error, results) {
        response.send(results);
    });
});

app.get("/blog/:collectionName/:id", function(request, response) {
    request.collection.findOne({_id: mongoskin.helper.toObjectID(request.params.id)}, function(error, results) {
        console.log("GETTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT",results)
        response.send(results);
    });
});

app.post("/blog/:collectionName", function(request, response) {
    console.log(request.body);
    request.collection.insert(request.body, function(error, results) {
        if (results) {
            response.send("Added");
        }
    });
});

app.del("/blog/:collectionName/:id", function(request, response) {
    request.collection.remove({_id: mongoskin.helper.toObjectID(request.params.id)}, function(error, results) {
        response.sendStatus(200);
    });
});

app.put("/blog/:collectionName/:id", function(request, response) {
    var id = mongoskin.helper.toObjectID(request.params.id);
    delete request.body._id;
    request.collection.update({_id: id}, request.body, function(error, results) {
        response.sendStatus(200);
    });
});

app.listen(5000);
