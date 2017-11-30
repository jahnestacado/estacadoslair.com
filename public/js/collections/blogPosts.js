define(["backbone", "blogPostModel"], function(Backbone, BlogPostModel) {

    var BlogPosts = Backbone.Collection.extend({
        model: BlogPostModel,
        url: "/blog/articles"
    });

    return BlogPosts;
});