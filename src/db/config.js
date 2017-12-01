var mongoskin = require("mongoskin");
var mongoClient = mongoskin.MongoClient;
var mongoURI = process.env.MONGO_URI || "localhost:27017";
var _ = require("underscore");
var COLLECTIONS = ["blog", "users"];
var bus = require("hermes-bus");
var bcrypt = require("bcrypt");

var SUPER_ADMIN_DEFAULT_CREDENTIALS = {
    username: "admin",
    password: bcrypt.hashSync("admin", 15)
};

var initializeAdminUser = function(db, onDone, onError){
    var usersCollection = db.collection("users");
    usersCollection.find().toArray(function(error, results) {
        if(error) {
            onError(error);
        } else if(results.length === 0) {
            usersCollection.insert(SUPER_ADMIN_DEFAULT_CREDENTIALS, function(error, results) {
                error ? onError(error) : onDone();
            });
        }
    });
};

var initializeCollections = function(db, onDone, onError) {
    db.collections(function(error, collections) {
        if (error) {
            onError(error);
        } else {
            var existingCollections = collections.map(function(collection) {
                return collection.collectionName;
            });
            
            COLLECTIONS.forEach(function(collectionName) {
                if (!_.contains(existingCollections, collectionName)) {
                    db.createCollection(collectionName, function(error) {
                        if (error) {
                            onError(error);
                        } else {
                            console.log(
                                "Collection: " +
                                    collectionName +
                                    " successfully initialized!!!"
                            );
                            if(collectionName === "users") {
                                initializeAdminUser(db, function(){
                                    console.log("Created user " + SUPER_ADMIN_DEFAULT_CREDENTIALS.username);
                                }, onError);
                            }
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
