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

            if (blogPostModel) {
                blogPostModel.fetch({
                    success: function() {
                        view.$el.html(view.template(blogPostModel.attributes));
                    },
                });
            }
        },
    });

    return BlogPostView;

});