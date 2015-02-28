var BlogPostView = Backbone.View.extend({
    el: "#post-container",
    template: _.template($("#blog-post-template").html()),
    render: function(blogPostModel) {
        var view = this;
        view.blogPostModel = blogPostModel;
        
        if (view.blogPostModel) {
            view.blogPostModel.fetch({
                success: function() {
                    view.$el.html(view.template(view.blogPostModel.attributes));
                }
            });
        }
    },
});