var express = require("express");
var bodyParser = require("body-parser");

var app = express();
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(express.static(__dirname + "/../public"));

app.use("/blog", require("./api.js"));

app.listen(process.env.PORT || 5000);
