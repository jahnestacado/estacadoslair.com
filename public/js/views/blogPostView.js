define([
    "jquery",
    "underscore",
    "backbone",
    "text!blogPostTemplate",
], function($, _, Backbone, viewTemplate) {

    var BlogPostView = Backbone.View.extend({
        el: ".curtain-B",
        template: _.template(viewTemplate),
        render: function(blogPostModel) {
            var view = this;
            $(".curtain-B").scrollTop(0);

            if (blogPostModel) {
                view.$el.html(view.template(blogPostModel.attributes));
            }
        },
    });

    return BlogPostView;

});
