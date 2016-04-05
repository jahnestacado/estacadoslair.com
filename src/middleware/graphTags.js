var dbUtils = require("./../db/blog-collection-utils.js");
var Q = require("q");
var DynamicGraphTags = require("./../templates/dynamic-graph-tags.js");
var createError = require("http-errors");
var sanitizeHtml = require("sanitize-html");
var path = require("path");
var cwd = process.cwd();
var fs = require("fs");
var HTML = fs.readFileSync(path.join(cwd, "public/index.html")).toString();
var DESCRIPTION_LENGTH = 200;
var SCRAPER_AGENTS = ["facebookexternalhit", "LinkedInBot"];

module.exports =  function addGraphTags(request, response, next){
    var refererUrl = request.originalUrl;
    var agent = request.get("user-agent");
    var isScraperAgent = SCRAPER_AGENTS.some(function(validAgent){
        return agent.indexOf(validAgent) > -1;
    });
    
    var deferred = Q.defer();
    var promise =  deferred.promise;
    if(isScraperAgent && /^(\/blog\/)/.test(refererUrl) && refererUrl.split("/").length === 4){
        var id = refererUrl.match(/\/blog\/(.*)\/.*/)[1];
        dbUtils.findOne({id: id}, function(results){
            if(results){
                results.url = "https://" + request.get("host") + refererUrl + "/";
                results.description = getPostDescription(results.body);
                deferred.resolve(DynamicGraphTags(results));
            } else{
                deferred.reject(createError(404));
            }
        }, deferred.reject)

        promise.then(function(graphTags){
            const htmlWithGraphTags = HTML.replace("<head>", "<head>" + graphTags);
            response.status(200).send(htmlWithGraphTags);
        }, function(error){
            response.sendStatus(error.status || 500);
        });
    } else{
        next();
    }
};

function getPostDescription(body){
    var sanitizedHtml = sanitizeHtml(body, {allowedTags: [], allowedAttributes: []});
    return sanitizedHtml.substring(0, DESCRIPTION_LENGTH);
}
