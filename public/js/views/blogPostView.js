define([
    "jquery",
    "underscore",
    "backbone",
    "text!blogPostTemplate",
    "curtain"
], function($, _, Backbone, viewTemplate, CURTAIN) {

    var BlogPostView = Backbone.View.extend({
        el: "#curtain-right",
        template: _.template(viewTemplate),
        render: function(blogPostModel) {
            CURTAIN.open();

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