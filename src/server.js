var express = require("express");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var session  = require("express-session");
var mongoskin = require("mongoskin");
var mongoUrl = process.env.MONGO || "localhost:27017";

//Initialize connection and export it in order to reuse it
exports.dbConnection = mongoskin.db("mongodb://" + mongoUrl + "/mywebsite");;

var app = express();
app.use(cookieParser("secret"));
app.use(session());
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(express.static(__dirname + "/../public"));

app.listen(process.env.PORT || 5000);

app.use("/blog", require("./routes/blog.js"));
app.use("/login", require("./routes/login.js"));

