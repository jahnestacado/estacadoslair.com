define(["backbone"], function(Backbone) {

    var UserAuth = Backbone.Model.extend({
        defaults: {
            username: "",
            password: "",
        },
        validate: function(attrs){
            var error;

            if(_.isEmpty(attrs.username) || _.isEmpty(attrs.password)){
                var emptyField = attrs.username ? "password" : "username";
                error = "You need to fill in a " + emptyField + "!";
            }

            return error;
        },
        url: function() {
            return "/login";
        },
    });

    return UserAuth;
});
