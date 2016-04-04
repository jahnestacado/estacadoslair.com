define([
    "jquery",
    "underscore",
    "backbone",
    "userAuth",
    "text!loginTemplate",
    "curtain"
], function($, _, Backbone, AuthModel, viewTemplate, CURTAIN) {

    var LoginView = Backbone.View.extend({
        initialize: function(){
            var view = this;
            view.authModel = new AuthModel();
        },
        el: "#icon-bar",
        template: _.template(viewTemplate),
        render: function() {
            CURTAIN.close();
            var view = this;

            view.$el
            .html(view.template())
            .hide()
            .fadeIn(800);
        },
        events: {
            "click #login-btn": "requestLogin",
            "click #login-back-home": "navigateToHomePage"
        },
        requestLogin: function(event) {
            var view = this;
            event.stopPropagation();
            event.preventDefault();

            view.authModel.set("username", view.$el.find("#inputEmail").val());
            view.authModel.set("password", view.$el.find("#inputPassword").val());

            if (view.authModel.isValid()) {
                view.authModel.save(null, {
                    dataType: 'text',
                    success: view.onAuthSuccess,
                    error: view.onAuthError
                });
            } else {
                Backbone.bus.trigger("notification", {
                    message: view.authModel.validationError,
                    status: "error"
                });
            }
        },
        onAuthError: function(){
            Backbone.bus.trigger("notification", {
                message: "Incorrect username or password!",
                status: "error"
            });
        },
        onAuthSuccess: function(response){
            require("routes").navigate("/edit", {trigger: true});
            Backbone.bus.trigger("notification", {
                message: "Welcome " + response.attributes.username + "!", status: "success"
            });
        },
        navigateToHomePage: function() {
            var view = this;
            require("routes").navigate("/", {trigger: true});
        }
    });

    return LoginView;

});
