var dbUtils = require("./../db/blog-collection-utils.js");
var Q = require("q");
var DynamicGraphTags = require("./../templates/dynamic-graph-tags.js");
var createError = require("http-errors");
var sanitizeHtml = require("sanitize-html");
var DESCRIPTION_LENGTH = 200;

module.exports =  function addGraphTags(request, response, next){
    var refererUrl = global.referer;
    delete global.referer;

    var deferred = Q.defer();
    var promise =  deferred.promise;
    if(refererUrl && /^(\/blog\/)/.test(refererUrl) && refererUrl.split("/").length === 4){
        var id = refererUrl.match(/\/blog\/(.*)\/.*/)[1];
        dbUtils.findOne({id: id}, function(results){
            if(results){
                results.url = "https://" + request.get("host") + refererUrl;
                results.description = getPostDescription(results.body);
                deferred.resolve(DynamicGraphTags(results));
            } else{
                deferred.reject(createError(404));
            }
        }, deferred.reject)

        promise.then(function(graphTags){
            request.graphTags = graphTags;
            next();
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
