define([
    "jquery",
    "backbone",
    "blogPosts",
    "text!listViewTemplate",
    "curtain"
], function($, Backbone, BlogPosts, viewTemplate, CURTAIN) {

    var BlogPostListView = Backbone.View.extend({
        el: "#curtain-left",
        template: _.template(viewTemplate),
        render: function() {
            var view = this;
            var blogPosts = new BlogPosts();

            Backbone.bus.trigger("fadeOutHomeView");

            blogPosts.fetch({
                success: function(blogPosts) {
                    view.$el.html(view.template({posts: blogPosts.models}));
                    window.appRouter.navigate(document.URL.split("/#")[1].split("/")[0] + "/" + blogPosts.models[0].attributes._id, {trigger: true});
                }
            });

        },
        events: {
            "click #back-btn": "closeCurtain"
        },
        closeCurtain: function() {
            CURTAIN.close();
            window.appRouter.navigate("/", {trigger: true});
        },
    });

    return BlogPostListView;
});