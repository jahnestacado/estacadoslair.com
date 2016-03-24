var bus = require("hermes-bus");
var mongoskin = require("mongoskin");
var dbConnection = require("./../db/config.js").dbConnection;
var blogCollection = dbConnection.collection("blog");

var Utils = {
    findAll: function(onDone, onError){
        blogCollection.find().toArray(function(error, results) {
            error ? onError(error) : onDone(results);
        });
    },
    findOne: function(id, onDone, onError){
        blogCollection.findOne({_id: mongoskin.helper.toObjectID(id)}, function(error, results) {
            error ? onError(error) : onDone(results);
        });
    },
    insert: function(obj, onDone, onError){
        blogCollection.insert(obj, function(error, results) {
            error ? onError(error) : onDone(results);
        });
    },
    remove: function(id, onDone, onError){
        blogCollection.remove({_id: mongoskin.helper.toObjectID(id)}, function(error, results) {
            error ? onError(error) : onDone(results);
        });
    },
    update: function(obj, onDone, onError){
        var id = mongoskin.helper.toObjectID(obj._id);
        delete obj._id;
        blogCollection.update({_id: id}, obj, function(error, results) {
            error ? onError(error) : onDone(results);
        });
    }
};

module.exports = Utils;
