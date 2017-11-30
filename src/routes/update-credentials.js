var express = require("express");
var updatePasswordRouter = express.Router();
var bcrypt = require("bcrypt");
var bus = require("hermes-bus");
var auth = require("./../middleware/auth.js");
var dbConnection;

bus.subscribe("db", {
    onDatabaseReady: function(db) {
        dbConnection = db;
    },
});

var updateCredentials = function(username, newUsername, newPassword, onDone, onError) {
    console.log(username, newUsername, newPassword);
    bcrypt.hash(newPassword, 15, function(error, hash) {
        if(error){
            onError(error);
        } else {
            dbConnection.collection("users")
            .update({username: username}, {username: newUsername, password: hash}, onDone, onError);
        }
    })
};

updatePasswordRouter.post("/", auth, function(request, response) {
    var body = request.body;
    var username = body.username;
    var password = body.password;
    var newPassword = body.newPassword;
    var newPasswordConfirmation = body.newPasswordConfirmation;
    var existingUsername = request.cookies.username;
    dbConnection.collection("users").findOne({username: username}, function(error, result) {
        bcrypt.compare(password, result.password, function(error, isAuthorized){
            if(isAuthorized && newPassword === newPasswordConfirmation){
                updateCredentials(existingUsername, username, newPassword, function() {
                    response.sendStatus(200);
                });
            } else {
                response.status(400).send("Invalid password confirmation.");
            }
        });
    });
});

module.exports = updatePasswordRouter;