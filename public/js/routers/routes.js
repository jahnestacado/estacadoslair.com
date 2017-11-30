define([
    "underscore",
    "backbone",
    "homeView",
    "loginView",
    "notFoundView",
    "masterDetailViewFactory",
    "updateCredentialsView",
    "notificationView",
    "adminPanelView",
], function (_, Backbone, HomeView, LoginView, NotFoundView, masterDetailViewFactory, UpdateCredentialsView) {

    var AppRouter = Backbone.Router.extend({
        routes: {
            "": "loadHomePage",
            "blog/:id/:slug": "loadBlogPost",
            "blog/:id": "loadBlogPost",
            "blog": "loadBlogPage",
            "create": "loadCreatePostPage",
            "update-credentials": "updateCredentialsPage",
            "login": "loadLoginPage",
            "edit/:id/:slug": "loadEditPost",
            "edit": "loadEditBlogPage",
            "*notFound": "loadNotFoundPage",
        },
        initialize: function () {
            var router = this;
            router.notFoundView = new NotFoundView();
            router.blogMasterDetailView = masterDetailViewFactory.getView("blog");
            router.editBlogMasterDetailView = masterDetailViewFactory.getView("edit");
            router.createBlogMasterDetailView =  masterDetailViewFactory.getView("create");
            router.homeView = new HomeView();
            router.loginView = new LoginView();
            router.updateCredentialsView = new UpdateCredentialsView();
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
                message: "Could not find requested page!",
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
            router.blogMasterDetailView.render();
        },
        updateCredentialsPage: function () {
            var router = this;
            router.updateCredentialsView.render();
        },
        loadBlogPost: function (id) {
            var router = this;
            router.blogMasterDetailView.render(id);
        },
        loadEditBlogPage: function () {
            var router = this;
            router.editBlogMasterDetailView.render();
        },
        loadEditPost: function (id) {
            var router = this;
            router.editBlogMasterDetailView.render(id);
        },
        loadCreatePostPage: function () {
            var router = this;
            router.createBlogMasterDetailView.render();
        },
    });

    return new AppRouter();
});
