var express = require("express");
var hashbangRedirect = express.Router();

hashbangRedirect.get("*", function (request, response, next) {
    var originalUrl = request.originalUrl;
    if (originalUrl[0] !== "#") {
        request.session.referer = originalUrl;
        var hashbangedUrl = originalUrl.replace("/", "/#");
        return response.redirect("http://" + request.get("host") + hashbangedUrl);
    }
});

module.exports = hashbangRedirect;
