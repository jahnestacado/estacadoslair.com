require([
    "underscore",
    "backboneExtended",
    "text!adminPanelViewTemplate",
], function ( _, Backbone, viewTemplate) {

    var AdminPanelView = Backbone.View.extend({
        initialize: function () {
            var view = this;
            Backbone.bus.on("activateAdminPanel", view.render, view);
        },
        el: "body",
        template: _.template(viewTemplate),
        render: function () {
            var view = this;
            Backbone.View.onAccessGranted({
                onSuccess: function () {
                    $(view.template()).appendTo(view.$el);
                }
            });
        },
        events: {
            'click #admin-panel-home-btn': "navigateToHomePage",
            'click #admin-panel-create-btn': "navigateToCreatePage",
            'click #admin-panel-edit-btn': "navigateToEditPage",
            'click #admin-panel-blog-btn': "navigateToBlogPage",
            'click #admin-panel-logout-btn': "logoutUser",
        },
        navigateToHomePage: function () {
            require("routes").navigate("/", {trigger: true});
        },
        navigateToCreatePage: function () {
            require("routes").navigate("/create", {trigger: true});
        },
        navigateToEditPage: function () {
            require("routes").navigate("/edit", {trigger: true});
        },
        navigateToBlogPage: function () {
            require("routes").navigate("/blog", {trigger: true});
        }, 
        logoutUser: function(){
            // TODO
        }
    });

    new AdminPanelView();
});
