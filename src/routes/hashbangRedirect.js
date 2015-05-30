var express = require("express");
var hashbangRedirect = express.Router();

hashbangRedirect.get("*", function (request, response) {
    var originalUrl = request.originalUrl;

    if (originalUrl[0] !== "#") {
        var hashbangedUrl = originalUrl.replace("/", "/#");
        return response.redirect('http://' + request.get('host') + hashbangedUrl);
    }
});

module.exports = hashbangRedirect;