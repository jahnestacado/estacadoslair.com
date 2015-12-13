define([
    "backbone",
    "blogPostListView",
    "createBlogPostView"
], function (Backbone, BlogPostListView, CreateBlogPostView ) {

    var CreateBlogPostListView = BlogPostListView.extend({
        initialize: function (blogPosts) {
            var view = this;
            view.blogPostView = new CreateBlogPostView();
            view.blogPosts = blogPosts;
            Backbone.bus.on("createBlogPost", view.createNewBlogPost, view);
        },
        render: function () {
            var view = this;
            Backbone.View.onAccessGranted({
                onSuccess: function () {
                    BlogPostListView.prototype.render.apply(view, [null]);
                },
                onFailure: function () {
                    Backbone.bus.trigger("notification", {
                        message: "Unauthorized action! Please login.",
                        status: "error"
                    });
                    require("routes").navigate("/login", {trigger: true});
                }
            });
        },
        renderBlogPost: function () {
            var view = this;
            view.$el.find(".list-group a").css({'pointer-events': "none"});
            view.blogPostView.render();
        },
        createNewBlogPost: function(model){
            var view = this;
            console.log("before",view.blogPosts);
            model.save(model.attributes,{
                dataType: "text",
                success: function (model, response) {
                    Backbone.bus.trigger("notification", {message: "Created post!",status: "success"});
                    view.blogPosts.add(JSON.parse(response));
                    view.render();
                },
                error: function () {
                    Backbone.bus.trigger("notification", {message: "Couldn't create post!",status: "error"});
                }
            });
        }
    });

    return CreateBlogPostListView;
});
