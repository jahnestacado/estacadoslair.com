var express = require("express");
var hashbangRedirect = express.Router();
var createError = require("http-errors");

hashbangRedirect.get("*", function (request, response, next) {
    var originalUrl = request.originalUrl;
    var hashbangedUrl = originalUrl.replace("/", "/#");
    if (originalUrl[0] !== "#") {
        global.referer = originalUrl;
        response.redirect("http://" + request.get("host") + hashbangedUrl);
    } else{
        next(createError(404));
    }
});

module.exports = hashbangRedirect;
