define([
    "jquery",
    "underscore",
    "backbone",
    "blogPostListView",
    "text!editListViewTemplate",
], function ($, _, Backbone, BlogPostListView, viewTemplate) {

    var EditBlogPostListView = BlogPostListView.extend({
        template: _.template(viewTemplate),
        initialize: function (options) {
            var view = this;
            view.blogPostView = options.blogPostView;
            view.blogPosts = options.blogPosts;
            Backbone.bus.on("refreshEditBlogPostListView", view.refresh, view);
            view.blogPosts.on("change:date", view.onModelChanged,view);
        },
        render: function (blogId) {
            var view = this;
            Backbone.View.onAccessGranted({
                onSuccess: function () {
                    BlogPostListView.prototype.render.apply(view, [blogId]);
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
        onModelChanged: function(model){
            var view = this;
            var blogId = model.attributes.OK.id;
            if(blogId){
                view.refresh(blogId);
            }
        },
        events: {
            "click .icon.icon-cross": "deletePost"
        },
        deletePost: function (event) {
            event.stopPropagation();

            var targetElQ = $(event.target);
            var id = targetElQ.data("id");
            var isDeletionConfirmed = confirm("Do you really want to delete post: '" + targetElQ.parent().text() + "' ?");

            if (isDeletionConfirmed) {
                var view = this;
                var targetBlogPost = view.getModelFromCollection(id);

                targetBlogPost.destroy({
                    dataType: "text",
                    success: function () {
                        Backbone.bus.trigger("notification", {
                            message: "Deleted post!",
                            status: "success"
                        });
                        view.refresh();
                    },
                    error: function () {
                        Backbone.bus.trigger("notification", {
                            message: "Couldn't delete post!",
                            status: "error"
                        });
                    }
                });
            }
        }
    });

    return EditBlogPostListView;
});
