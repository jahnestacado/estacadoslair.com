define(["backbone", "blogPost"], function(Backbone, BlogPost) {

    var BlogPosts = Backbone.Collection.extend({
        model: BlogPost,
        url: "/blog/articles"
    });

    return BlogPosts;
});