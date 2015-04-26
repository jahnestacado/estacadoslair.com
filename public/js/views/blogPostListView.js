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

            blogPosts.fetch({
                success: function(blogPosts) {
                    Backbone.bus.trigger("fadeOutHomeView");
                    view.$el.html(view.template({posts: blogPosts.models}));

                    var blogPath;
                    if (blogPosts.models.length) {
                        blogPath = blogPosts.models[0].attributes._id;
                    } else {
                        blogPath = "none";
                    }
                    window.appRouter.navigate(document.URL.split("/#")[1].split("/")[0] + "/" + blogPath, {trigger: true});
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