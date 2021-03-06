define([
    "jquery",
    "underscore",
    "backbone",
    "updateCredentialsModel",
    "text!updateCredentialsTemplate",
    "curtain"
], function($, _, Backbone, CredentialsModel, viewTemplate, CURTAIN) {

    var CredentialsView = Backbone.View.extend({
        initialize: function(){
            var view = this;
            view.credentialsModel = new CredentialsModel();
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
            
            var jwt = window.localStorage.getItem("jwt");
            if(jwt){
                var username = JSON.parse(atob(jwt.split(".")[0])).username;
                view.$el.find("#username").val(username);
            }
        },
        events: {
            "click #update-credentials-btn": "submit"
        },
        submit: function(event) {
            var view = this;
            event.stopPropagation();
            event.preventDefault();

            view.credentialsModel.set("username", view.$el.find("#username").val());
            view.credentialsModel.set("password", view.$el.find("#currentPassword").val());
            view.credentialsModel.set("newPassword", view.$el.find("#newPassword").val());
            view.credentialsModel.set("newPasswordConfirmation", view.$el.find("#newPasswordConfirmation").val());

            if (view.credentialsModel.isValid()) {
                view.credentialsModel.save(null, {
                    headers: { jwt : window.localStorage.getItem("jwt")},
                    dataType: 'text',
                    success: view.onUpdateCredentialsSuccess,
                    error: view.onUpdateCredentialsError
                });
            } else {
                Backbone.bus.trigger("notification", {
                    message: view.credentialsModel.validationError,
                    status: "error"
                });
            }
        },
        onUpdateCredentialsError: function(){
            Backbone.bus.trigger("notification", {
                message: "Incorrect username or password!",
                status: "error"
            });
        },
        onUpdateCredentialsSuccess: function(response){
            Backbone.bus.trigger("notification", {
                message: "Updated credentials",
                status: "success"
            });
            Backbone.bus.trigger("logout");
        },
        navigateToHomePage: function() {
            var view = this;
            require("routes").navigate("/", {trigger: true});
        }
    });

    return CredentialsView;

});
