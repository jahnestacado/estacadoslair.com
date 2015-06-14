var express = require("express");
var logoutRouter = express.Router();

logoutRouter.post('/', function (request, response) {
    request.session.destroy();
    response.clearCookie("sessionId");
    response.clearCookie("username");
    response.end();
});

module.exports = logoutRouter;