define([
    "jquery",
    "underscore",
    "backbone",
    "text!blogPostTemplate"
], function($, _, Backbone, viewTemplate) {

    var BlogPostView = Backbone.View.extend({
        el: "#curtain-right",
        template: _.template(viewTemplate),
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