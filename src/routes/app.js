var express = require("express");
var graphTagRouter = express.Router();
var path = require("path");
var cwd = process.cwd();
var fs = require("fs");
var HTML = fs.readFileSync(path.join(cwd, "public/index.html")).toString();
var DynamicGraphTags = require("./../templates/dynamic-graph-tags.js");
var addGraphTags = require("./../middleware/graphTags.js");

graphTagRouter.get("/", addGraphTags, function(request, response, next){
    var requestedHtml = HTML;
    if(request.graphTags){
        requestedHtml = HTML.replace("<head>", "<head>" + request.graphTags);
        delete request.graphTags;
    }
    response.send(requestedHtml);
});

module.exports = graphTagRouter;
