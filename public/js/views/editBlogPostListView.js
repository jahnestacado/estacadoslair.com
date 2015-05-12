define([
    "jquery",
    "underscore",
    "backbone",
    "blogPostListView",
    "blogPost",
    "text!editListViewTemplate"
], function($, _, Backbone, BlogPostListView, BlogPost, viewTemplate) {

    var EditBlogPostListView = BlogPostListView.extend({
        initialize: function() {
            var view = this;
            Backbone.bus.on("updateListView", view.onChange, view);
        },
        render: function() {
            var view = this;
            Backbone.View.onAccessGranted(function() {
                BlogPostListView.prototype.render.apply(view);
            });
        },
        template: _.template(viewTemplate),
        events: {
            "click .delete-btn": "deletePost"
        },
        deletePost: function(event) {
            var id = $(event.target).data("id");
            var view = this;

            view.render();
            var blogPost = new BlogPost({_id: id});
            blogPost.destroy( {
                dataType: "text",
                success: function() {
                    Backbone.bus.trigger("notification", {
                        message: "Deleted post!",
                        status: "success"
                    });
                },
                error: function() {
                    Backbone.bus.trigger("notification", {
                        message: "Couldn't delete post!",
                        status: "error"
                    });
                }
            });
            Backbone.bus.trigger("hideEditBlogPostView");
            view.render();
        },
        onChange: function() {
            var view = this;
            view.render();
        }
    });

    return EditBlogPostListView;

});
