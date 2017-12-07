var Base64Utils = {
    atob: function(encodedStr){
        return Buffer.from(encodedStr, "base64").toString();
    }
};

module.exports = Base64Utils;