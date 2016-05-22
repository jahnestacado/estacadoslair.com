var fs = require("fs");
var path = require("path");
var sslDirPath = process.env.SSL_DIR || path.join(process.env.HOME, ".ssl");

var config = {
    key: fs.readFileSync(path.join(sslDirPath, "ssl.key")),
    cert: fs.readFileSync(path.join(sslDirPath, "ssl.crt")),
    ca: fs.readFileSync(path.join(sslDirPath, "ca.pem"))
};

module.exports = config;
