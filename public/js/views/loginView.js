define([
    "jquery",
    "underscore",
    "backbone",
    "userCredentialsModel",
    "text!loginTemplate",
    "curtain"
], function($, _, Backbone, UserCredentialsModel, viewTemplate, CURTAIN) {
    
    var LoginView = Backbone.View.extend({
        initialize: function(){
            var view = this;
            view.userCredentialsModel = new UserCredentialsModel();
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
            
            view.userCredentialsModel.set("username", view.$el.find("#username").val());
            view.userCredentialsModel.set("password", view.$el.find("#password").val());
            
            if (view.userCredentialsModel.isValid()) {
                view.userCredentialsModel.save(null, {
                    dataType: 'text',
                    success: view.onAuthSuccess,
                    error: view.onAuthError
                });
            } else {
                Backbone.bus.trigger("notification", {
                    message: view.userCredentialsModel.validationError,
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
            var jwt = response.get("jwt");
            window.localStorage.setItem("jwt", jwt);
            Backbone.$.ajaxSetup({
                headers: {jwt : jwt}
            });
            require("routes").navigate("/edit", {trigger: true});
            Backbone.bus.trigger("notification", {
                message: "Welcome " + response.get("username") + "!", status: "success"
            });
        },
        navigateToHomePage: function() {
            var view = this;
            require("routes").navigate("/", {trigger: true});
        }
    });
    
    return LoginView;
    
});
