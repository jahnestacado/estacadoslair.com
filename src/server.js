var express = require("express");
var https = require("https");
var sslConfig = require("./ssl/config.js");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var session = require("express-session");
var fs = require("fs");
var app = express();

app.use(cookieParser("secret"));
app.use(session());
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(express.static(__dirname + "/../public"));

https.createServer(sslConfig, app).listen(process.env.PORT || 5000);

app.use("/auth", require("./routes/authCheck.js"));
app.use("/login", require("./routes/login.js"));
app.use("/blog", require("./routes/blog.js"));


