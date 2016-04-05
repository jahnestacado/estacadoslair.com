var express = require("express");
var graphTagRouter = express.Router();
var path = require("path");
var cwd = process.cwd();
var fs = require("fs");
var HTML = fs.readFileSync(path.join(cwd, "public/webapp.html")).toString();
var bus = require("hermes-bus");
var graphTags;

bus.subscribe({
    onSetGraphTags: function(_graphTags){
        console.log("onEevnt");
        graphTags =_graphTags;
    }
});

graphTagRouter.get("/", function(request, response, next){
    var requestedHtml = HTML;
    if(graphTags){
        requestedHtml = HTML.replace("<head>", "<head>" + graphTags);
            console.log(requestedHtml);
        graphTags = null;
    }
    response.send(requestedHtml);
});

module.exports = graphTagRouter;
