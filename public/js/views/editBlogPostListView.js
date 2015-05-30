define([
    "jquery",
    "underscore",
    "backbone",
    "blogPostListView",
    "blogPost",
    "text!editListViewTemplate",
    "editBlogPostView"
], function ($, _, Backbone, BlogPostListView, BlogPost, viewTemplate, EditBlogPostView) {

    var EditBlogPostListView = BlogPostListView.extend({
        initialize: function () {
            var view = this;
            Backbone.bus.on("refreshEditListView", view.refresh, view);
            view.blogPostView = new EditBlogPostView();
        },
        render: function (blogId) {
            var view = this;
            Backbone.View.onAccessGranted(function () {
                BlogPostListView.prototype.render.apply(view, [blogId]);
            });
        },
        template: _.template(viewTemplate),
        events: {
            "click .icon.icon-bin2": "deletePost"
        },
        deletePost: function (event) {
            event.stopPropagation();

            var targetElQ = $(event.target);
            var id = targetElQ.data("id");
            var isDeletionConfirmed = confirm("Do you really want to delete post: '" + targetElQ.parent().text() + "'");

            if (isDeletionConfirmed) {
                var view = this;
                var blogPost = new BlogPost({_id: id});

                blogPost.destroy({
                    dataType: "text",
                    success: function () {
                        Backbone.bus.trigger("notification", {
                            message: "Deleted post!",
                            status: "success"
                        });

                        view.render();
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
