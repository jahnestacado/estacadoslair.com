var express = require("express");
var loginRouter = express.Router();
var bcrypt = require("bcrypt");
var bus = require("hermes-bus");
var jwt = require("./../utils/jwt.js");
var log = require("logia")("ROUTES::LOGIN");
var dbConnection;

bus.subscribe("db", {
    onDatabaseReady: function(db) {
        dbConnection = db;
    },
});

function initUserSession(request, response, onDone, onError) {
    var username = request.body.username;
    log.info("initUserSession for username: {0}", username);
    jwt.sign(username, onDone, onError);
}

loginRouter.post("/", function(request, response) {
    var username = request.body.username;
    dbConnection.collection("users").findOne({username: username}, function(error, result) {
        var status = 400; //Bad request
        var password = result && result.password || "";
        bcrypt.compare(request.body.password, password, function(error, isAuthorized){
            if(error) {
                log.error("post('/') -> username: {0}, status: {1} {2}", username, status, error.message);
                response.status(status).send(error.message);
            }  else if(isAuthorized) {
                initUserSession(request, response, function(token) {
                    status = 200;
                    log.info("post('/') -> username: {0}, status: 200, token: {1}", username, token);
                    response.status(status).send(token);
                }, function(error) {
                    log.error("post('/') -> username: {0}, status: {1} {2}", username, status, error.message);
                    response.status(status).send(error.message);
                });
            } else {
                log.error("post('/') - username: {0}, bcrypt.compare mismatch -> 401", username);
                response.sendStatus(401)
            }
        });
    });
});

module.exports = loginRouter;