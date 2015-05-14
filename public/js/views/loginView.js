define([
    "jquery",
    "underscore",
    "backbone",
    "userAuth",
    "text!loginTemplate",
    "curtain"
], function($, _, Backbone, UserAuth, viewTemplate, CURTAIN) {

    var LoginView = Backbone.View.extend({
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
            "click #login-back-home": "destroy"
        },
        requestLogin: function(event) {
            var view = this;
            event.stopPropagation();
            event.preventDefault();

            var username = view.$el.find("#inputEmail").val();
            var password = view.$el.find("#inputPassword").val();

            if (username !== "" && password !== "") {
                var userAuth = new UserAuth({username: username, password: password});
                userAuth.save(userAuth.attributes, {
                    dataType: 'text',
                    success: function() {
                        view.destroy();
                        require("routes").navigate("/update", {trigger: true});
                        Backbone.bus.trigger("notification", {
                            message: "Welcome " + username + "!", status: "success"
                        });
                    },
                    error: function() {
                        Backbone.bus.trigger("notification", {
                            message: "Incorrect username or password!",
                            status: "error"
                        });
                    }
                });
            } else {
                var emptyField = username ? "password" : "username";
                Backbone.bus.trigger("notification", {
                    message: "You need to fill in a " + emptyField + "!",
                    status: "error"
                });
            }
        },
        destroy: function() {
            var view = this;
            view.$el.children().remove();
        }
    });

    return LoginView;

});
