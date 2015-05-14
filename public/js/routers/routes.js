define([
    "backbone",
    "blogPostListView",
    "homeView",
    "loginView",
    "createBlogPostView",
    "editBlogPostListView",
], function(Backbone, BlogPostListView, HomeView, LoginView, CreateBlogPostView, EditBlogPostListView) {

    var AppRouter = Backbone.Router.extend({
        routes: {
            "": "loadHomePage",
            "blog/:id": "loadBlogPost",
            "blog": "loadBlogPage",
            "create": "loadCreatePostPage",
            "update/:id": "loadEditPost",
            "update": "loadEditBlogPage",
            "login": "loadLoginPage",
        },
        initialize: function() {
            var router = this;
            router.blogPostListView = new BlogPostListView();
            router.homeView = new HomeView();
            router.loginView = new LoginView();
            router.createBlogPostView = new CreateBlogPostView();
            router.editBlogPostListView = new EditBlogPostListView();
        },
        loadHomePage: function() {
            var router = this;
            router.homeView.render();
        },
        loadLoginPage: function() {
            var router = this;
            router.loginView.render();
        },
        loadBlogPage: function() {
            var router = this;
            router.blogPostListView.render();
        },
        loadBlogPost: function(id) {
            var router = this;
            router.blogPostListView.render(id);
        },
        loadCreatePostPage: function() {
            var router = this;
            router.blogPostListView.render();
            router.createBlogPostView.render();
        },
        loadEditBlogPage: function() {
            var router = this;
            router.editBlogPostListView.render();
        },
        loadEditPost: function(id) {
            var router = this;
            router.editBlogPostListView.render(id);
        },
    });

    return new AppRouter();
});