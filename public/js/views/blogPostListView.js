define([
    "jquery",
    "backbone",
    "text!listViewTemplate",
    "blogPostView",
    "curtain",

], function ($, Backbone, viewTemplate, BlogPostView, CURTAIN) {

    var BlogPostListView = Backbone.View.extend({
        el: ".curtain-A",
        template: _.template(viewTemplate),
        initialize: function (blogPosts) {
            var view = this;
            view.blogPostView = new BlogPostView();
            view.blogPosts = blogPosts;
        },
        render: function (blogId) {
            var view = this;

            var updateUI = function(blogPosts){
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
            };

            if(!view.blogPosts.length){
                view.fetchBlogPosts(updateUI);
            } else{
                updateUI(view.blogPosts);
            }
        },
        fetchBlogPosts: function(onDone){
            var view = this;
            view.blogPosts.fetch({
                success: function (blogPosts) {
                    onDone(blogPosts);
                },
                error: function () {
                    Backbone.bus.trigger("notification", {message: "Failed to fetch blogPost collection!",status: "error"});
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
            return view.blogPosts.where({_id:id})[0];
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
        },
    });

    return BlogPostListView;
});
