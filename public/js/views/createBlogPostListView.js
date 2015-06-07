define([
    "backbone",
    "blogPostListView",
    "createBlogPostView",
], function (Backbone, BlogPostListView, CreateBlogPostView) {

    var CreateBlogPostListView = BlogPostListView.extend({
        initialize: function () {
            var view = this;
            view.blogPostView = new CreateBlogPostView({listView: view});
        },
        render: function () {
            var view = this;
            Backbone.View.onAccessGranted(function () {
                BlogPostListView.prototype.render.apply(view, [null]);
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