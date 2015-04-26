var mongoskin = require("mongoskin");
var mongoUrl = process.env.MONGO || "localhost:27017";
var dbConnection = mongoskin.db("mongodb://" + mongoUrl + "/mywebsite");
var _ = require("underscore");
var COLLECTIONS = ["blog", "users"]

dbConnection.collections(function(erroe, collections) {
    var collectionNames = collections.map(function(collection) {
        return collection.collectionName;
    });

    COLLECTIONS.forEach(function(collection) {
        if (!_.contains(collectionNames, collection)) {
            dbConnection.createCollection(collection, function(error) {
                if (error) {
                    throw error;
                }
                console.log("Collection: " + collection + " successfully initialized!!!")
            });
        }
    });
})

exports.dbConnection = dbConnection;
