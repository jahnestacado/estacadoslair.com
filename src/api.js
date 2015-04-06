var express = require("express");
var router = express.Router();
var mongoskin = require("mongoskin");
var dbConnection = require("./server.js").dbConnection;

var username = "jahn";
var password = "jahn";

function isUserAuthorized(request, response) {
    var isAuthenticated = false;
    if (request.session[request.cookies.username] === request.cookies.sessionId) {
        isAuthenticated = true;
    } else {
        response.sendStatus(401); //Unauthorized
    }

    return isAuthenticated;
}

function isPasswordValid(username, password) {

}

function generateSessionId() {
    return Math.random(1000).toString();
}

router.post('/login', function(request, response) {
    var status;

    if (request.body.username === username && request.body.password === password) {
        request.session[request.body.username] = generateSessionId();
        response.cookie("sessionId", request.session[request.body.username]);
        response.cookie("username", request.body.username);
        status = 200; //OK
    } else {
        status = 400; //Bad request
    }

    response.sendStatus(status);
});

router.param('collectionName', function(request, response, next) {
    request.collection = dbConnection.collection(request.baseUrl.replace("/", ""));
    return next();
});

router.get("/:collectionName", function(request, response) {
    request.collection.find().toArray(function(error, results) {
        response.send(results);
    });
});

router.get("/:collectionName/:id", function(request, response) {
    if (isUserAuthorized(request, response)) {
        request.collection.findOne({_id: mongoskin.helper.toObjectID(request.params.id)}, function(error, results) {
            response.send(results);
        })
    }
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