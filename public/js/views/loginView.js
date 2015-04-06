var LoginView = Backbone.View.extend({
    el: "#icon-bar",
    template: _.template($("#login-template").html()),
    render: function(blogPostModel) {
        var view = this;
//        view.userModel = UserModel;

        view.$el.html(view.template());
    },
    events: {
        "click #login-btn": "requestLogin"
    },
    requestLogin: function(event) {
        var view = this;
        event.stopPropagation();
        event.preventDefault();

        var username = view.$el.find("#inputEmail").val();
        var password = view.$el.find("#inputPassword").val();
        var userAuth = new UserAuth({username: username, password: password});
        userAuth.save(userAuth.attributes, {
            success: function() {
                console.log("OK");
                appRouter.navigate("/update", {trigger: true});
            },
        });
    },
});