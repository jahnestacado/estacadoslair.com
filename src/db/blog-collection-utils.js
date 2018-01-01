var mongoskin = require("mongoskin");
require("./../db/config.js");
var blogCollection;
var bus = require("hermes-bus");
var log = require("logia")("DB::BLOG-COLLECTION-UTILS");

var normalizeResults = function(queryResults){
    var attributes = queryResults && queryResults.ops && queryResults.ops[0];
    var blogPost = {}
    if(attributes) {
        blogPost = {
            title: attributes.title,
            date: attributes.date,
            body: attributes.body,
            _id: attributes._id,
            slug: attributes.slug,
        }
    }
    log.trace("normalizeResults: {0} -> {1}", JSON.stringify(queryResults), JSON.stringify(blogPost));
    return blogPost;
};

bus.subscribe("db", {
    onDatabaseReady: function(db) {
        log.info("onDatabaseReady")
        blogCollection = db.collection("blog");
    },
});

var Utils = {
    findAll: function(onDone, onError) {
        blogCollection.find().toArray(function(error, results) {
            log.debug("findAll returned results: {0} and error: {1}", results, error);
            error ? onError(error) : onDone(results);
        });
    },
    findOne: function(queryObject, onDone, onError) {
        var query = Object.keys(queryObject).reduce(function(obj, key) {
            var value =
            key === "id"
                ? mongoskin.helper.toObjectID(queryObject[key])
                : queryObject[key]
            ;
            key = key === "id" ? "_id" : key;
            obj[key] = value;
            return obj;
        }, {});
        log.trace("findOne - queryObject normalization from {0} -> {1}", queryObject, query);
        blogCollection.findOne(query, function(error, results) {
            log.debug("findOne results: {0}", results);
            error ? onError(error) : onDone(results);
        });
    },
    insert: function(obj, onDone, onError) {
        log.debug("insert {0}", obj);
        blogCollection.insert(obj, function(error, results) {
            error ? onError(error) : onDone(normalizeResults(results));
        });
    },
    remove: function(id, onDone, onError) {
        log.debug("remove id: {0}", id);
        blogCollection.remove(
            { _id: mongoskin.helper.toObjectID(id) },
            function(error, results) {
                error ? onError(error) : onDone(normalizeResults(results));
            }
        );
    },
    update: function(obj, onDone, onError) {
        var id = mongoskin.helper.toObjectID(obj._id);
        delete obj._id;
        log.debug("update blog with id: {0} to {1}", id, obj);
        blogCollection.update({ _id: id }, obj, function(error, results) {
            error ? onError(error) : onDone(normalizeResults(results));
        });
    },
};

module.exports = Utils;
