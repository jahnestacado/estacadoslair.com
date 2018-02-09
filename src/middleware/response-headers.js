var log = require("logia")("MD::RESPONSE-HEADERS");
var hostInfo = require("./../utils/host-info.js");
var dockerHost = hostInfo.getDockerHost();
var containerId = hostInfo.getContainerId();

module.exports = function attachResponseHeaders(request, response, next) {
    log.trace("Setting response headers ['Access-Control-Allow-Origin', 'Host', 'ContainerId'] -> [*, {0}, {1}]", dockerHost, containerId);
    response.set('Access-Control-Allow-Origin', ['*']);
    response.set("Host", dockerHost);
    response.set("ContainerId", containerId);
    next();
};