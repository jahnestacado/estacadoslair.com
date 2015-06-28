define([
    "backbone",
    "blogPostListView",
    "createBlogPostView",
], function (Backbone, BlogPostListView, CreateBlogPostView) {

    var CreateBlogPostListView = BlogPostListView.extend({
        initialize: function () {
            var view = this;
            view.blogPostView = new CreateBlogPostView();
            Backbone.bus.on("refreshCreateBlogPostListView", view.refresh, view);
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
    });

    return CreateBlogPostListView;
});
