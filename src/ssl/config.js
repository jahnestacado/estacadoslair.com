var fs = require("fs");
var sslDirPath = process.env.HOME + "/.ssl";

var config = {
    key: fs.readFileSync(sslDirPath + "/ssl.key"),
    cert: fs.readFileSync(sslDirPath + "/ssl.crt"),
    ca: fs.readFileSync(sslDirPath + "/ca.pem"),
};

module.exports = config;