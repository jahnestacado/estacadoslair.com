var dbUtils = require("./../db/blog-collection-utils.js");
var CACHED_GRAPH_TAGS = {};
var _ = require("underscore");
var Q = require("q");
var DynamicGraphTags = require("./../templates/dynamic-graph-tags.js");

module.exports =  function addGraphTags(request, response, next){
    var refererUrl = request.session.referer;

    var deferred = Q.defer();
    var promise =  deferred.promise;
    if(refererUrl && /^(\/blog\/)/.test(refererUrl)){
        if(CACHED_GRAPH_TAGS[refererUrl]){
            deferred.resolve(CACHED_GRAPH_TAGS[refererUrl]);
        } else{
            var id = _.last(refererUrl.split("/"));
            dbUtils.findOne(id, function(results){
                results.url = "https://" + request.get("host") + refererUrl;
                CACHED_GRAPH_TAGS[refererUrl] = DynamicGraphTags(results);
                deferred.resolve(CACHED_GRAPH_TAGS[refererUrl]);
            }, deferred.reject)
        }

        delete request.session.referer;
        promise.then(function(graphTags){
            request.graphTags = graphTags;
            next();
        }, function(error){
            //
        });
    } else{
        next();
    }
};
