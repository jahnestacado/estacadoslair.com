var express = require("express");
var loginRouter = express.Router();
var bcrypt = require("bcrypt");
var bus = require("hermes-bus");
var jwt = require("./../utils/jwt.js");
var dbConnection;

bus.subscribe("db", {
    onDatabaseReady: function(db) {
        dbConnection = db;
    },
});

function generateSessionId() {
    return new Date().getTime().toString();
}

function initUserSession(request, response, onDone, onError) {
    var username = request.body.username;
    jwt.sign(username, onDone, onError);
}

loginRouter.post("/", function(request, response) {
    dbConnection.collection("users").findOne({username: request.body.username}, function(error, result) {
        var status = 400; //Bad request
        var password = result && result.password || "";
        bcrypt.compare(request.body.password, password, function(error, isAuthorized){
            if(!error) {
                initUserSession(request, response, function(token) {
                    status = 200;
                    response.status(status).send(token);
                }, function() {
                    response.sendStatus(status);
                });
            } 
        });
    });
});

module.exports = loginRouter;