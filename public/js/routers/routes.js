define([
    "underscore",
    "backbone",
    "blogPostListView",
    "homeView",
    "loginView",
    "createBlogPostListView",
    "editBlogPostListView",
    "notFoundView",
    "notificationView",
    "adminPanelView",
], function (_, Backbone, BlogPostListView, HomeView, LoginView, createBlogPostListView, EditBlogPostListView, NotFoundView) {

    var AppRouter = Backbone.Router.extend({
        routes: {
            "": "loadHomePage",
            "blog/:id": "loadBlogPost",
            "blog": "loadBlogPage",
            "create": "loadCreatePostPage",
            "login": "loadLoginPage",
            "edit/:id": "loadEditPost",
            "edit": "loadEditBlogPage",
            ":notFound": "loadNotFoundPage",
        },
        initialize: function () {
            var router = this;
            router.notFoundView = new NotFoundView();
            router.blogPostListView = new BlogPostListView();
            router.homeView = new HomeView();
            router.loginView = new LoginView();
            router.createBlogPostListView = new createBlogPostListView();
            router.editBlogPostListView = new EditBlogPostListView();
            router.bind( "all",  _.debounce(router.handleDisplayOfAdminPanel, 500));
        },
        handleDisplayOfAdminPanel: function () {
            var router = this;
            /*
             * sessionId is removed on log-out so here we trigger the activateAdminPanel only when it is present.
             * Otherwise it means that the user is not logged-in
             */
            if (document.cookie.match(/sessionId/)) {
                Backbone.bus.trigger("activateAdminPanel");
            }
        },
        loadNotFoundPage: function () {
            var router = this;
            router.notFoundView.render();
            Backbone.bus.trigger("notification", {
                message: "You are far away from Home son!",
                status: "error"
            });
        },
        loadHomePage: function () {
            var router = this;
            router.homeView.render();
        },
        loadLoginPage: function () {
            var router = this;
            router.loginView.render();
        },
        loadBlogPage: function () {
            var router = this;
            router.blogPostListView.render();
        },
        loadBlogPost: function (id) {
            var router = this;
            router.blogPostListView.render(id);
        },
        loadCreatePostPage: function () {
            var router = this;
            router.createBlogPostListView.render();
        },
        loadEditBlogPage: function () {
            var router = this;
            router.editBlogPostListView.render();
        },
        loadEditPost: function (id) {
            var router = this;
            router.editBlogPostListView.render(id);
        },
    });

    return new AppRouter();
});
