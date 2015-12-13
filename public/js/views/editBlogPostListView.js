define([
    "jquery",
    "underscore",
    "backbone",
    "blogPostListView",
    "editBlogPostView",
    "text!editListViewTemplate",
], function ($, _, Backbone, BlogPostListView, EditBlogPostView, viewTemplate) {

    var EditBlogPostListView = BlogPostListView.extend({
        template: _.template(viewTemplate),
        initialize: function (blogPosts) {
            var view = this;
            view.blogPostView = new EditBlogPostView();
            view.blogPosts = blogPosts;
            Backbone.bus.on("updateBlogPost", view.updatePost, view);
        },
        render: function (blogId) {
            var view = this;
            Backbone.View.onAccessGranted({
                onSuccess: function () {
                    BlogPostListView.prototype.render.apply(view, [blogId]);
                },
                onFailure: function () {
                    Backbone.bus.trigger("notification", {message: "Unauthorized action! Please login.",status: "error"});
                    require("routes").navigate("/login", {trigger: true});
                }
            });
        },
        events: {
            "click .icon.icon-cross": "deletePost"
        },
        updatePost: function(model){
            var view = this;
            model.save(model.attributes, {
                dataType: "text",
                success: function () {
                    Backbone.bus.trigger("notification", {message: "Updated post!",status: "success"});
                    view.refresh(model.id);
                },
                error: function () {
                    Backbone.bus.trigger("notification", {message: "Couldn't update post!",status: "error"});
                }
            });
        },
        deletePost: function (event) {
            event.stopPropagation();
            var targetElQ = $(event.target);
            var id = targetElQ.data("id");
            var isDeletionConfirmed = confirm("Do you really want to delete post: '" + targetElQ.parent().text() + "' ?");

            if (isDeletionConfirmed) {
                var view = this;
                var targetModel = view.getModelFromCollection(id);

                targetModel.destroy({
                    dataType: "text",
                    success: function () {
                        Backbone.bus.trigger("notification", {message: "Deleted post!",status: "success"});
                        view.refresh();
                    },
                    error: function () {
                        Backbone.bus.trigger("notification", {message: "Couldn't delete post!",status: "error"});
                    }
                });
            }
        }
    });

    return EditBlogPostListView;
});
