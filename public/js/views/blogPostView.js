define([
    "jquery",
    "underscore",
    "backbone"
], function($, _, Backbone) {

    var BlogPostView = Backbone.View.extend({
        el: "#curtain-right",
        template: _.template($("#blog-post-template").html()),
        render: function(blogPostModel) {
            window.curtain.open();

            var view = this;
            view.blogPostModel = blogPostModel;

            if (view.blogPostModel) {
                view.blogPostModel.fetch({
                    success: function() {
                        view.$el.html(view.template(view.blogPostModel.attributes));
                    },
                });
            }
        },
    });

    return BlogPostView;

});