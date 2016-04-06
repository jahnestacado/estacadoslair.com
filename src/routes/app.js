var express = require("express");
var graphTagRouter = express.Router();
var bus = require("hermes-bus");
var path = require("path");
var cwd = process.cwd();
var fs = require("fs");
var HTML = fs.readFileSync(path.join(cwd, "public/webapp.html")).toString();

bus.subscribe({
    onSendGraphTags: function(attachAndSendGraphTags){
        attachAndSendGraphTags(HTML);
    }
});

graphTagRouter.get("/", function(request, response){
    response.send(HTML);
});

module.exports = graphTagRouter;
