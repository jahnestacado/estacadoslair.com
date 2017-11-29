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
    jwt.sign(username, function(token) {
        response.cookie("sessionId", request.session[username]);
        response.cookie("username", request.body.username);
        onDone();
    }, onError);
}

loginRouter.post('/', function(request, response) {
    dbConnection.collection("users").findOne({username: request.body.username}, function(error, result) {
        var status = 400; //Bad request

        bcrypt.compare(request.body.password, result.password, function(error, isAuthorized){
            if(!error) {
                initUserSession(request, response, function() {
                    status = 200;
                    response.sendStatus(status);
                }, function() {
                    response.sendStatus(status);
                });
            } 
        });
    });
});

module.exports = loginRouter;