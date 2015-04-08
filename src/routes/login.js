var express = require("express");
var loginRouter = express.Router();

var username = "jahn";
var password = "jahn";

function isPasswordValid(username, password) {

}

function generateSessionId() {
    return new Date().getTime().toString();
}

loginRouter.post('/', function(request, response) {
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

module.exports = loginRouter;