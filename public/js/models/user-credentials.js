define(["backbone"], function(Backbone) {

    var UserCredentialsModel = Backbone.Model.extend({
        defaults: {
            username: "not-set",
            password: "not-set",
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

    return UserCredentialsModel;
});
