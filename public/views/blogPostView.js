var BlogPostView = Backbone.View.extend({
    el: "#post-container",
    initialize: function(id) {
        this.id = id;
    },
    template: _.template($("#blog-post-template").html()),
    render: function() {
        var view = this;
        var blogPost = new BlogPost({_id: view.id});

        blogPost.fetch({
            success: function(blogPost) {
                view.$el.html(view.template(blogPost.attributes));
            }
        });
    },

});