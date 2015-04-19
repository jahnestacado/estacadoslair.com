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
            view.$el.html(view.template());
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
            var userAuth = new UserAuth({username: username, password: password});
            userAuth.save(userAuth.attributes, {
                dataType: 'text',
                success: function() {
                    view.destroy();
                    window.appRouter.navigate("/update", {trigger: true});
                },
            });
        },
        destroy: function() {
            var view = this;
            view.$el.children().remove();
        }
    });

    return LoginView;

});
