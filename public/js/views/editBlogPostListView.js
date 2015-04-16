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
            Backbone.bus.on("updateListView", this.onChange, this);
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
            blogPost.destroy();
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
