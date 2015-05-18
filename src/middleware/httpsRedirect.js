module.exports = function redirectToHTTPS(request, response, next) {
    if (!request.secure) {
        return response.redirect('https://' + request.get('host') + request.url);
    }
    next();
};
