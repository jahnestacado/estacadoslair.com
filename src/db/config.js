var mongoskin = require("mongoskin");
var mongoURI = process.env.MONGO_URI || "localhost:27017";
var dbConnection = mongoskin.db("mongodb://" + mongoURI + "/mywebsite");
var _ = require("underscore");
var COLLECTIONS = ["blog", "users"]

dbConnection.collections(function(error, collections) {
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
