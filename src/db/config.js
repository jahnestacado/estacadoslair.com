var mongoskin = require("mongoskin");
var mongoClient = mongoskin.MongoClient;
var mongoURI = process.env.MONGO_URI || "localhost:27017";
var _ = require("underscore");
var COLLECTIONS = ["blog", "users"];
var bus = require("hermes-bus");

var initializeCollections = function(db, onDone, onError) {
    db.collections(function(error, collections) {
        if (error) {
            onError(error);
        } else {
            var collectionNames = collections.map(function(collection) {
                return collection.collectionName;
            });

            COLLECTIONS.forEach(function(collection) {
                if (!_.contains(collectionNames, collection)) {
                    db.createCollection(collection, function(error) {
                        if (error) {
                            onError(error);
                        } else {
                            console.log(
                                "Collection: " +
                                    collection +
                                    " successfully initialized!!!"
                            );
                        }
                    });
                }
            });
            onDone();
        }
    });
};

var connect = function(onError) {
    var db;
    db = mongoClient.connect("mongodb://" + mongoURI + "/mywebsite");
    initializeCollections(
        db,
        function() {
            bus.db.triggerDatabaseReady(db);
        },
        onError
    );
};

var connectWithRetry = function() {
    connect(function(error) {
        console.error(error);
        setTimeout(connectWithRetry, 10000);
    });
};

connectWithRetry(10000);
