var jwt = require("./../utils/jwt.js");

module.exports = function isUserAuthorized(request, response, next) {
    jwt.verify(request.cookies.sessionId, function() {
        next();
    }, function(error) {
        response.sendStatus(401); //Unauthorized
    });
};