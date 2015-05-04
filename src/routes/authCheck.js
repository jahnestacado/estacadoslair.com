var express = require("express");
var auth = require("./../middleware/auth.js");
var authcheckRouter = express.Router();

authcheckRouter.get("/isAuthorized", auth, function(request, response) {
    response.sendStatus(200);
});

module.exports = authcheckRouter;