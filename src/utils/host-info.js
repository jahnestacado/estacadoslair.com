var log = require("logia")("UTILS::HOST-INFO");
var os = require("os");
var containerId = "";
var dockerHost = os.hostname();
var fs = require("fs");
if(process.env.DOCKER_HOSTNAME_PATH) {
    containerId = dockerHost;
    dockerHost = fs.readFileSync(process.env.DOCKER_HOSTNAME_PATH, "utf8").replace("\n","");
}
log.info("Docker host: {0}, ContainerId : {1}", dockerHost, containerId);

var Info = {
    getDockerHost: function(){
        return dockerHost;
    },
    getContainerId: function(){
        return containerId;
    }
};

module.exports = Info;