var jwt = require("./../utils/jwt.js");
var log = require("logia")("MD::AUTH");

module.exports = function isUserAuthorized(request, response, next) {
    jwt.verify(request.get("jwt"), function() {
        log.debug("isUserAuthorized -> 200");
        next();
    }, function(error) {
        log.debug("isUserAuthorized -> 401");
        response.sendStatus(401); //Unauthorized
    });
};