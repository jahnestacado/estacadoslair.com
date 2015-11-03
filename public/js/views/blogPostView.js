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
            var view = this;
            $("#curtain-right").scrollTop(0);

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
