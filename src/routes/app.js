var express = require("express");
var appRouter = express.Router();
var bus = require("hermes-bus");
var path = require("path");
var cwd = process.cwd();
var fs = require("fs");
var HTML = fs.readFileSync(path.join(cwd, "public/webapp.html")).toString();
var log = require("logia")("ROUTES::APP");

bus.subscribe({
    onSendGraphTags: function(attachAndSendGraphTags){
        log.info("onSendGraphTags");
        attachAndSendGraphTags(HTML);
    }
});

appRouter.get("/", function(request, response){
    log.debug("get('/') -> {0}", HTML);
    response.send(HTML);
});

module.exports = appRouter;
