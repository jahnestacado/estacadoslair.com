var express = require("express");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var session  = require("express-session");

var app = express();
app.use(cookieParser("secret"));
app.use(session());
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(express.static(__dirname + "/../public"));

app.use("/blog", require("./api.js"));

app.listen(process.env.PORT || 5000);
