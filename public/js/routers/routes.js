define([
    "underscore",
    "backbone",
    "blogPostListView",
    "homeView",
    "loginView",
    "createBlogPostListView",
    "editBlogPostListView",
    "webCamView",
    "notFoundView",
    "notificationView",
    "adminPanelView",
], function (_, Backbone, BlogPostListView, HomeView, LoginView, createBlogPostListView, EditBlogPostListView, WebCamView, NotFoundView) {

    var AppRouter = Backbone.Router.extend({
        routes: {
            "": "loadHomePage",
            "blog/:id": "loadBlogPost",
            "blog": "loadBlogPage",
            "create": "loadCreatePostPage",
            "login": "loadLoginPage",
            "edit/:id": "loadEditPost",
            "edit": "loadEditBlogPage",
            "spidercam": "loadWebCamPage",
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
            router.webCamView = new WebCamView();
            router.bind( "all",  _.debounce(router.handleDisplayOfAdminPanel, 500));
        },
        handleDisplayOfAdminPanel: function () {
            var router = this;
            /*
             * Cookies are removed on log-out so here we trigger the activateAdminPanel only when they are present.
             * Otherwise it means that the user is not logged-in
             */
            if (document.cookie !== "") {
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
        loadWebCamPage: function (id) {
            var router = this;
            router.webCamView.render();
        },
    });

    return new AppRouter();
});
