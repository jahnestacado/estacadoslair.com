var express = require("express");
var blogRouter = express.Router();
var auth = require("./../middleware/auth.js");
var path = "/articles";
var dbUtils = require("./../db/blog-collection-utils.js");
var createError = require("http-errors");
var log = require("logia")("ROUTES::BLOG");

blogRouter.get(path, function(request, response, next) {
    dbUtils.findAll(function(articles){
        var articlesInfo = articles.map(function(article){
            delete article.body;
            return article;
        });
        log.debug("get('{0}') - findAll -> 200", path);
        response.status(200).json(articlesInfo);
    }, function(error){
        log.error("get('{0}') - findAll -> 404", path);
        next(createError(404));
    });
});

blogRouter.get(path + "/:id/:slug", function(request, response, next) {
    var params = request.params;
    var id = params.id;
    var slug = params.slug;
    dbUtils.findOne({id: id, slug: slug}, function(results){
        log.debug("get('{0}/{1}/{2}') - findOne -> 200 {3}", path, id, slug, results);
        response.status(200).json(results);
    }, function(error){
        log.error("get('{0}/{1}/{2}') - findOne -> 404", path, id, slug);
        next(createError(404));
    });
});

blogRouter.post(path, auth, function(request, response, next) {
    dbUtils.insert(request.body, function(results){
        log.info("post('{0}') - insert {0} -> 200", path, request.body);
        response.status(201).json(results);
    }, function(error){
        log.error("post('{0}') - insert {1} -> {2}", path, request.body, error.message);
        next(error);
    });
});

blogRouter.delete(path + "/:id/:slug", auth, function(request, response, next) {
    var params = request.params;
    var id = params.id;
    var slug = params.slug;
    dbUtils.remove(id, function(results){
        log.info("delete('{0}/{1}/{2}') - remove -> 200", path, id, slug);
        response.status(200).json(results);
    }, function(error){
        log.error("delete('{0}/{1}/{2}') - remove -> {3}", path, id, slug, error.message);
        next(error);
    });
});

blogRouter.put(path + "/:id/:slug", auth, function(request, response, next) {
    var params = request.params;
    var id = params.id;
    var slug = params.slug;
    dbUtils.update(request.body, function(results){
        log.info("put('{0}/{1}/{2}') - update {3}-> 200", path, id, slug, request.body);
        response.status(200).json(results);
    }, function(error){
        log.error("put('{0}/{1}/{2}') - update -> {3}", path, id, slug, error.message);
        next(error);
    });
});

module.exports = blogRouter;
