define(["backbone", "userCredentialsModel"], function(Backbone, UserCredentialsModel) {

    var UpdateCredentiasModel = UserCredentialsModel.extend({
        defaults: {
            newPassword: "not-set",
            newPasswordConfirmation: "not-set",
        },
        validate: function(attrs){
            var error;

            if(attrs.newPasswordConfirmation !== attrs.newPassword){
                error = "Password confirmation failed";
            }

            return error;
        },
        url: function() {
            return "/update-credentials";
        },
    });

    return UpdateCredentiasModel;
});
