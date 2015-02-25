var BlogPostListView = Backbone.View.extend({
    el: "#list-container",
    template: _.template($("#list-view-template").html()),
    render: function() {
        var view = this;
        
        var blogPosts = new BlogPosts();

        blogPosts.fetch({
            success: function(blogPosts) {
                view.$el.html(view.template({posts: blogPosts.models}));
            }
        });

    },
});