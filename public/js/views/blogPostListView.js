define([
    "jquery",
    "backbone",
    "text!listViewTemplate",
    "curtain",

], function ($, Backbone, viewTemplate, CURTAIN) {

    var BlogPostListView = Backbone.View.extend({
        el: "#curtain-left",
        template: _.template(viewTemplate),
        initialize: function (options) {
            var view = this;
            view.blogPostView = options.blogPostView;
            view.blogPosts = options.blogPosts;
        },
        render: function (blogId) {
            var view = this;

            view.blogPosts.fetch({
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
                var selectedBlogPost = view.getModelFromCollection(id);
                view.blogPostView.render(selectedBlogPost);
            }
        },
        events: {
            "click #back-home": "loadHomePage",
            "click .list-group a": "selectBlogPost"
        },
        getModelFromCollection: function(id){
            var view = this;
            var model = view.blogPosts.models.reduce(function(o, m){
                return m.id === id ? o = m: o;
            },{});

            return model;
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
