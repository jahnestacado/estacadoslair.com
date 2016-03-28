var dbUtils = require("./../db/blog-collection-utils.js");
var Q = require("q");
var DynamicGraphTags = require("./../templates/dynamic-graph-tags.js");

module.exports =  function addGraphTags(request, response, next){
    var refererUrl = request.session.referer;
    var deferred = Q.defer();
    var promise =  deferred.promise;
    if(refererUrl && /^(\/blog\/)/.test(refererUrl)){
        var id = refererUrl.match(/\/blog\/(.*)\/.*/)[1];
        dbUtils.findOne(id, function(results){
            results.url = "https://" + request.get("host") + refererUrl;
            deferred.resolve(DynamicGraphTags(results));
        }, deferred.reject)

        promise.then(function(graphTags){
            request.graphTags = graphTags;
            next();
        }, next);
    } else{
        next();
    }

    delete request.session.referer;
};
