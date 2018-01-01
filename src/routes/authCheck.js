var express = require("express");
var auth = require("./../middleware/auth.js");
var authcheckRouter = express.Router();
var log = require("logia")("ROUTES::AUTH-CHECK");

authcheckRouter.get("/isAuthorized", auth, function(request, response) {
    log.info("get('/isAuthorized' -> 200");
    response.sendStatus(200);
});

module.exports = authcheckRouter;