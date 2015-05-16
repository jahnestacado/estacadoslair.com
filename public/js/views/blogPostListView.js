define([
    "jquery",
    "backbone",
    "blogPosts",
    "text!listViewTemplate",
    "curtain",
    "blogPostView",
    "blogPost"
            /*  "routes" Uses routes module but with inline-require to avoid circular dependency*/
], function($, Backbone, BlogPosts, viewTemplate, CURTAIN, BlogPostView, BlogPost) {

    var BlogPostListView = Backbone.View.extend({
        el: "#curtain-left",
        template: _.template(viewTemplate),
        initialize: function() {
            var view = this;
            view.blogPostView = new BlogPostView();
        },
        render: function(blogId) {
            var view = this;
            var blogPosts = new BlogPosts();

            blogPosts.fetch({
                success: function(blogPosts) {
                    Backbone.bus.trigger("fadeOutHomeView");
                    CURTAIN.open();
                    view.$el.html(view.template({posts: blogPosts.models}));

                    if (blogPosts.models.length) {

                        if (!blogId) {
                            //If blogId is not specified pick first blog post
                            blogId = blogPosts.models[0].attributes._id;
                        }

                        view.loadBlogPost(blogId);
                    }
                }
            });
        },
        loadBlogPost: function(id) {
            var view = this;

            if (id) {
                var blogPost = new BlogPost({"_id": id});
                view.blogPostView.render(blogPost);
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