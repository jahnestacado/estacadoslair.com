var jwt = require("jsonwebtoken");
var JWT_SECRET = process.env.JWT_SECRET || "secret";
var ALG = "HS256";

var JWT = {
    sign: function(username, onDone, onError){
        jwt.sign({
            exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 31), // 1 month
            username: username,
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
    },
    getClaim:  function(headlessToken, claimName){
        return headlessToken.split(".")[0][claimName];
    }
};

module.exports = JWT;