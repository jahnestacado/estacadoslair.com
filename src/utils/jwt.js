var jwt = require("jsonwebtoken");
var JWT_SECRET = process.env.JWT_SECRET || "secret";
var ALG = "HS256";

var JWT = {
    sign: function(key, onDone, onError){
        jwt.sign({
            exp: 43800 * 60 * 1000, // 1 month
            data: key,
        },
        JWT_SECRET,
        {algorithm: ALG},
        function(error, token) {
            error ? onError(error) : onDone(JWT.getHeaderlessToken(token));
        });
    },
    verify: function(headlessToken, onDone, onError){
        var token = [JWT.getHeader(), headlessToken].join(".");
        jwt.verify(token, JWT_SECRET, function(error, decoded) {
            error ? onError(error) : onDone();
        });
    },
    getHeaderlessToken: function(token){
        return token.replace(/^.*?\./, "");
    },
    getHeader: function(){
        return Buffer.from('{"alg":"'+ ALG +'","typ":"JWT"}').toString("base64");
    }
};

module.exports = JWT;