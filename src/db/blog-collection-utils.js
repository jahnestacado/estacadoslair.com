var mongoskin = require("mongoskin");
require("./../db/config.js");
var blogCollection;
var bus = require("hermes-bus");

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
    return blogPost;
};

bus.subscribe("db", {
    onDatabaseReady: function(db) {
        blogCollection = db.collection("blog");
    },
});

var Utils = {
    findAll: function(onDone, onError) {
        blogCollection.find().toArray(function(error, results) {
            error ? onError(error) : onDone(results);
        });
    },
    findOne: function(queryObject, onDone, onError) {
        var query = Object.keys(queryObject).reduce(function(obj, key) {
            var value =
            key === "id"
            ? mongoskin.helper.toObjectID(queryObject[key])
            : queryObject[key];
            key = key === "id" ? "_id" : key;
            obj[key] = value;
            return obj;
        }, {});
        blogCollection.findOne(query, function(error, results) {
            error ? onError(error) : onDone(results);
        });
    },
    insert: function(obj, onDone, onError) {
        blogCollection.insert(obj, function(error, results) {
            error ? onError(error) : onDone(normalizeResults(results));
        });
    },
    remove: function(id, onDone, onError) {
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
        blogCollection.update({ _id: id }, obj, function(error, results) {
            error ? onError(error) : onDone(normalizeResults(results));
        });
    },
};

module.exports = Utils;
