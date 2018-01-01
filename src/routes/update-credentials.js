var express = require("express");
var updatePasswordRouter = express.Router();
var bcrypt = require("bcrypt");
var bus = require("hermes-bus");
var auth = require("./../middleware/auth.js");
var jwt = require("./../utils/jwt.js");
var log = require("logia")("ROUTE::UPDATE-CREDENTIALS");
var dbConnection;

bus.subscribe("db", {
    onDatabaseReady: function(db) {
        dbConnection = db;
    },
});

var updateCredentials = function(username, newUsername, newPassword, onDone) {
    log.info("updateCredentials for username: {0} -> newUsername: {1}", username, newUsername);
    bcrypt.hash(newPassword, 15, function(error, hash) {
        if(error){
            onDone(error);
        } else {
            dbConnection.collection("users")
            .update({username: username}, {username: newUsername, password: hash}, onDone);
        }
    })
};

updatePasswordRouter.post("/", auth, function(request, response) {
    var body = request.body;
    var username = body.username;
    var password = body.password;
    var newPassword = body.newPassword;
    var newPasswordConfirmation = body.newPasswordConfirmation;
    var existingUsername = jwt.getClaim(request.get("jwt"), "username");
    dbConnection.collection("users").findOne({username: username}, function(error, result) {
        bcrypt.compare(password, result.password, function(error, isAuthorized){
            if(isAuthorized && newPassword === newPasswordConfirmation){
                updateCredentials(existingUsername, username, newPassword, function(error) {
                    if(error) {
                        log.error("post('/') -> Invalid password confirmation.");
                        response.status(500).send(error.message);
                    } else {
                        log.info("post('/') -> 200");
                        response.sendStatus(200);
                    }
                });
            } else {
                log.error("post('/') -> Invalid password confirmation.");
                response.status(400).send("Invalid password confirmation.");
            }
        });
    });
});

module.exports = updatePasswordRouter;