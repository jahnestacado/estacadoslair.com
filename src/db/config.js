var mongoskin = require("mongoskin");
var mongoClient = mongoskin.MongoClient;
var mongoURI = process.env.MONGO_URI || "localhost:27017";
var _ = require("underscore");
var COLLECTIONS = ["blog", "users", "file-storage"];
var bus = require("hermes-bus");
var bcrypt = require("bcrypt");
var SUPER_ADMIN_DEFAULT_CREDENTIALS = {
    username: "admin",
    password: bcrypt.hashSync("admin", 15)
};
var log = require("logia")("DB::CONFIG");

var initializeAdminUser = function(db, onDone, onError){
    log.info("initializeAdminUser");
    var usersCollection = db.collection("users");
    usersCollection.find().toArray(function(error, results) {
        if(error) {
            onError(error);
        } else if(results.length === 0) {
            log.info("initializeAdminUser - User collection doesn't exist, hence creating it...");
            usersCollection.insert(SUPER_ADMIN_DEFAULT_CREDENTIALS, function(error, results) {
                error ? onError(error) : onDone();
            });
        }
    });
};

var initializeCollections = function(db, onDone, onError) {
    log.info("initializeCollections");
    db.collections(function(error, collections) {
        if (error) {
            onError(error);
        } else {
            var existingCollections = collections.map(function(collection) {
                return collection.collectionName;
            });
            log.debug("initializeCollections - existingCollections: {0}", existingCollections);
            
            COLLECTIONS.forEach(function(collectionName) {
                if (!_.contains(existingCollections, collectionName)) {
                    db.createCollection(collectionName, function(error) {
                        if (error) {
                            onError(error);
                        } else {
                            log.info("Collection: {0} successfully initialized!!!", collectionName);
                            
                            if(collectionName === "users") {
                                initializeAdminUser(db, function(){
                                    log.info("Created user {0}", SUPER_ADMIN_DEFAULT_CREDENTIALS.username);
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
    log.info("Trying to connect to mongo database: {0}", "mongodb://" + mongoURI + "/mywebsite");
    var db = mongoClient.connect("mongodb://" + mongoURI + "/mywebsite");
    db.on("close", onError);
    // Since ths horrible mongoskin API doesn't provide proper error handling
    // the stats function is used to check if there is an open connection
    db.stats(function(isClosed){
        if(!isClosed) {
            initializeCollections(
                db,
                function() {
                    bus.db.triggerDatabaseReady(db);
                },
                onError
            );
        }
    });
};

var connectWithRetry = function() {
    connect(function(error) {
        log.error("connection error {0}", error.message);
        setTimeout(connectWithRetry, 10000);
    });
};

connectWithRetry();
