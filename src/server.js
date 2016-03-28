var express = require("express");
var https = require("https");
var httpsRedirect = require("./middleware/httpsRedirect.js");
var sslConfig = require("./ssl/config.js");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var session = require("express-session");
var compress = require("compression");
var app = express();

app.use(compress());
app.use(httpsRedirect);
app.use(cookieParser("secret"));
app.use(session());
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use("/", require("./routes/app.js"));
app.use(express.static(__dirname + "/../public"));

//Start HTTPS server
https.createServer(sslConfig, app).listen(process.env.HTTPS_PORT || 5000);

//Start HTTP server which redirects everything to HTTPS through httpsRedirect middleware
app.listen(process.env.PORT || 5050);
app.use("/auth", require("./routes/authCheck.js"));
app.use("/login", require("./routes/login.js"));
app.use("/logout", require("./routes/logout.js"));
app.use("/blog", require("./routes/blog.js"));
app.use("/upload", require("./routes/fileUpload.js"));

//This router should be used always in the end
app.use("*", require("./routes/hashbangRedirect.js"));
