module.exports = function redirectToHTTPS(request, response, next) {
    if (!request.secure) {
        response.redirect("https://" + request.get("host") + request.url);
    }else{
        next();
    }
};
