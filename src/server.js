var express = require("express");
var https = require("https");
var bodyParser = require("body-parser");
var compress = require("compression");
var path = require("path");
var app = express();
var fileStorageCollectionUtils = require("./db/file-storage-collection-utils.js");
var handleError = require("./middleware/error-handler.js");
var attachHostInfo = require("./middleware/host-info.js");
var appRoute = require("./routes/app.js");
var log = require("logia")("SERVER");

fileStorageCollectionUtils.syncFileStorageDir();

app.use(attachHostInfo);
app.use(compress());
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use("/", appRoute);
app.use(express.static(path.join(__dirname, "/../public")));

log.info("Try to listen on port {0}", process.env.PORT || 7070);
app.listen(process.env.PORT || 7070);
app.use("/auth", require("./routes/authCheck.js"));
app.use("/login", require("./routes/login.js"));
app.use("/blog", require("./routes/blog.js"));
app.use("/file-storage", require("./routes/fileStorage.js"));
app.use("/update-credentials", require("./routes/update-credentials.js"));

//This router should be used always in the end
 app.use("*", function(request, response){
     log.debug("Unhandled route. Serving webapp.html");
     response.sendFile("webapp.html", {root:path.join( __dirname, "/../public")})
 });
 
 app.use(handleError);

