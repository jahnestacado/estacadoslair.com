define(["backbone", "userAuth"], function(Backbone, UserAuth) {

    var CredentialModel = UserAuth.extend({
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

    return CredentialModel;
});
