define(["backbone"], function(Backbone) {

    var UserAuth = Backbone.Model.extend({
        defaults: {
            username: "",
            password: "",
        },
        initialize: function(options) {
            var model = this;

            if (options && options.username && options.password) {
                model.set("username", options.username);
                model.set("password", options.password);
            }
        },
        url: function() {
            return "/login";
        },
    });

    return UserAuth;
});

