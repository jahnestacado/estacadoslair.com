var express = require("express");
var loginRouter = express.Router();
var bcrypt = require("bcrypt");
var bus = require("hermes-bus");
var dbConnection;

bus.subscribe("db", {
    onDatabaseReady: function(db) {
        dbConnection = db;
    },
});

function generateSessionId() {
    return new Date().getTime().toString();
}

function initUserSession(request, response) {
    request.session[request.body.username] = generateSessionId();
    response.cookie("sessionId", request.session[request.body.username]);
    response.cookie("username", request.body.username);
}

loginRouter.post('/', function(request, response) {
    dbConnection.collection("users").findOne({username: request.body.username}, function(error, result) {
        var status = 400; //Bad request

        bcrypt.compare(request.body.password, result.password, function(error, isAuthorized){
            if(!error) {
                initUserSession(request, response);
                status = 200;
            } 
            response.sendStatus(status);
        });
    });
});

module.exports = loginRouter;