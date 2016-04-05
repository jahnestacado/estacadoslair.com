var express = require("express");
var hashbangRedirect = express.Router();
var createError = require("http-errors");
var graphTagHandler = require("./../middleware/graphTags.js");

hashbangRedirect.get("*", graphTagHandler, function (request, response, next) {
    var originalUrl = request.originalUrl;
    var hashbangedUrl = originalUrl.replace("/", "/#");
    if (originalUrl[0] !== "#") {
        response.redirect("http://" + request.get("host") + hashbangedUrl);
    } else{
        next(createError(404));
    }
});

module.exports = hashbangRedirect;
