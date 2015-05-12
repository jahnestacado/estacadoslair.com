define([
    "jquery",
    "backbone",
    "blogPosts",
    "text!listViewTemplate",
    "curtain",
            /*  "routes" Uses routes module but with inline-require to avoid circular dependency*/
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
                    view.onLoad(blogPosts);
                }
            });
        },
        onLoad: function(blogPosts) {
            var page = document.URL.split("/#")[1].split("/")[0];

            if (page === "update" || page === "blog") {
                Backbone.bus.trigger("fadeOutHomeView");

                var blogPath;
                if (blogPosts.models.length) {
                    blogPath = blogPosts.models[0].attributes._id;
                } else {
                    blogPath = "none";
                }

                require("routes").navigate(page + "/" + blogPath, {trigger: true});
            }
        },
        events: {
            "click #back-btn": "closeCurtain"
        },
        closeCurtain: function() {
            CURTAIN.close();
            require("routes").navigate("/", {trigger: true});
        },
    });

    return BlogPostListView;
});