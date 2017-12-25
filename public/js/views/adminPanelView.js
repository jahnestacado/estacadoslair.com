require([
    "jquery",
    "underscore",
    "backboneExtended",
    "text!adminPanelViewTemplate",
    "fileUploadView"
], function($, _, Backbone, viewTemplate, FileUploadView) {
    var AdminPanelView = Backbone.View.extend({
        initialize: function() {
            var view = this;
            Backbone.bus.on("activateAdminPanel", view.render, view);
            Backbone.bus.on("logout", view.logoutUser, view);
        },
        el: "body",
        template: _.template(viewTemplate),
        render: function() {
            var view = this;
            Backbone.View.onAccessGranted({
                onSuccess: function() {
                    // Always guarantees that we have only one admin-panel attached to body element
                    if (!$("#admin-panel").length) {
                        $(view.template()).appendTo(view.$el);
                        view.fileUploadView = new FileUploadView({parentElQ: view.$el});
                        view.fileUploadView.render();
                    }
                },
            });
        },
        events: {
            "click #admin-panel-home-btn": "navigateToHomePage",
            "click #admin-panel-create-btn": "navigateToCreatePage",
            "click #admin-panel-edit-btn": "navigateToEditPage",
            "click #admin-panel-blog-btn": "navigateToBlogPage",
            "click #admin-panel-update-credentials-btn": "navigateToUpdateCredentialsPage",
            "click #admin-panel-logout-btn": "logoutUser"
        },
        navigateToHomePage: function() {
            require("routes").navigate("/", { trigger: true });
        },
        navigateToCreatePage: function() {
            require("routes").navigate("/create", { trigger: true });
        },
        navigateToEditPage: function() {
            require("routes").navigate("/edit", { trigger: true });
        },
        navigateToBlogPage: function() {
            require("routes").navigate("/blog", { trigger: true });
        },
        navigateToUpdateCredentialsPage: function() {
            require("routes").navigate("/update-credentials", { trigger: true });
        },
        logoutUser: function() {
            var view = this;
            window.localStorage.removeItem("jwt");
            Backbone.bus.trigger("notification", {
                message: "Bye bye!",
                status: "success",
            });
            view.navigateToHomePage();
            view.destroy();
        },
        destroy: function() {
            var view = this;
            view.$el.find("#admin-panel").remove();
        },
    });

    new AdminPanelView();
});
