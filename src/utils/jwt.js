var jwt = require("jsonwebtoken");
var JWT_SECRET = process.env.JWT_SECRET || "secret";

var JWT = {
    sign: function(username, onDone, onError){
        jwt.sign({
            exp: 43800 * 60 * 1000, // 1 month
            data: username,
        }, JWT_SECRET, function(error, token) {
            error ? onError(error) : onDone(token);
        });
    },
    verify: function(token, onDone, onError){
        jwt.verify(token, JWT_SECRET, function(error, decoded) {
            error ? onError(error) : onDone();
        });
    }
};

module.exports = JWT;