var log = require("logia")("MD::HOST-INFO");
var os = require("os");
var hostInfo = process.env.DOCKER_HOST + "-" + os.hostname();
log.info("Host info: ${0}", hostInfo);

module.exports = function attachHostInfo(request, response, next) {
    response.set('Access-Control-Allow-Origin', ['*']);
    response.set("Host", hostInfo);
    next();
};