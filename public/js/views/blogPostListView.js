define([
    "jquery",
    "backbone",
    "blogPosts",
    "text!listViewTemplate",
    "curtain",
    "blogPostView",
    "blogPost"
            /*  "routes" Uses routes module but with inline-require to avoid circular dependency*/
], function ($, Backbone, BlogPosts, viewTemplate, CURTAIN, BlogPostView, BlogPost) {

    var BlogPostListView = Backbone.View.extend({
        el: "#curtain-left",
        template: _.template(viewTemplate),
        initialize: function () {
            var view = this;
            view.blogPostView = new BlogPostView();
        },
        render: function (blogId) {
            var view = this;
            var blogPosts = new BlogPosts();

            blogPosts.fetch({
                success: function (blogPosts) {
                    Backbone.bus.trigger("fadeOutHomeView");
                    CURTAIN.open();
                    view.$el.html(view.template({posts: blogPosts.models}));

                    if (blogPosts.models.length) {

                        if (!blogId) {
                            //If blogId is not specified pick first blog post
                            blogId = blogPosts.models[0].attributes._id;
                        }
                        
                        view.renderBlogPost(blogId);
                    }
                },
                error: function () {
                    Backbone.bus.trigger("notification", {
                        message: "Failed to fetch blogPost collection!",
                        status: "error"
                    });
                }
            });
        },
        renderBlogPost: function (id) {
            var view = this;
            if (id) {
                $("#" + id).addClass("active");
                var blogPost = new BlogPost({"_id": id});
                view.blogPostView.render(blogPost);
            }
        },
        events: {
            "click #back-home": "loadHomePage",
            "click .list-group a": "selectBlogPost"
        },
        loadHomePage: function () {
            CURTAIN.close();
            require("routes").navigate("/", {trigger: true});
        },
        selectBlogPost: function (event) {
            var targetElQ = $(event.target);
            var id = targetElQ.attr("id");
            var view = this;

            require("routes").navigate("#" + view.getPathDomain() + "/" + id, {trigger: true});
        },
        getPathDomain: function () {
            var pathDomain = document.URL.split("/")[3];
            return pathDomain;
        },
        refresh: function(id){
            var view = this;
            view.render(id);
        }
    });

    return BlogPostListView;
});