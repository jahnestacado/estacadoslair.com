var express = require("express");
var https = require("https");
var bodyParser = require("body-parser");
var compress = require("compression");
var path = require("path");
var app = express();

app.use(compress());
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use("/", require("./routes/app.js"));
app.use(express.static(path.join(__dirname, "/../public")));

//Start HTTP server which redirects everything to HTTPS through httpsRedirect middleware
app.listen(process.env.PORT || 7070);
app.use("/auth", require("./routes/authCheck.js"));
app.use("/login", require("./routes/login.js"));
app.use("/blog", require("./routes/blog.js"));
app.use("/upload", require("./routes/fileUpload.js"));
app.use("/update-credentials", require("./routes/update-credentials.js"));

//This router should be used always in the end
 app.use("*", function(request, response){
     response.sendFile("webapp.html", {root:path.join( __dirname, "/../public")})
 });
