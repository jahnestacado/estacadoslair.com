var express = require("express");
var blogRouter = express.Router();
var auth = require("./../middleware/auth.js");
var path = "/articles";
var dbUtils = require("./../db/blog-collection-utils.js");
var createError = require("http-errors");

blogRouter.get(path, function(request, response, next) {
    dbUtils.findAll(function(results){
        response.status(200).json(results);
    }, function(error){
        next(createError(404));
    });
});

blogRouter.get(path + "/:id/:slug", function(request, response, next) {
    dbUtils.findOne(request.params.id, function(results){
        response.status(200).json(results);
    }, function(error){
        next(createError(404));
    });
});

blogRouter.post(path, auth, function(request, response, next) {
    dbUtils.insert(request.body, function(results){
        response.status(201).json(results);
    }, function(error){
        next(error);
    });
});

blogRouter.delete(path + "/:id/:slug", auth, function(request, response, next) {
    dbUtils.remove(request.params.id, function(results){
        response.status(200).json(results);
    }, function(error){
        next(error);
    });
});

blogRouter.put(path + "/:id/:slug", auth, function(request, response, next) {
    dbUtils.update(request.body, function(results){
        response.status(200).json(results);
    }, function(error){
        next(error);
    });
});

module.exports = blogRouter;
