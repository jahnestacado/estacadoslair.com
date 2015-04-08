module.exports = function isUserAuthorized(request, response, next) {
    var isAuthenticated = request.cookies.sessionId && (request.session[request.cookies.username] === request.cookies.sessionId);

    if (isAuthenticated) {
        next();
    } else {
        response.sendStatus(401); //Unauthorized
    }
};