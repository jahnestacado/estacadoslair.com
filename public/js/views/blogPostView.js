define([
    "jquery",
    "underscore",
    "backbone",
    "text!blogPostTemplate",
], function($, _, Backbone, viewTemplate) {

    var BlogPostView = Backbone.View.extend({
        el: "#curtain-right",
        template: _.template(viewTemplate),
        render: function(blogPostModel) {
            $("#curtain-right").scrollTop(0);
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