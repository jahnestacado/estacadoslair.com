define(["backbone", "jquery"], function (Backbone, $) {
    Backbone.bus = $.extend({}, Backbone.Events);

    Backbone.View = $.extend(Backbone.View, {
        onAccessGranted: function (callbacks) {
            $.get("/auth/isAuthorized").then(
                function success(){
                    callbacks.onSuccess && callbacks.onSuccess();
                },
                function error(){
                    callbacks.onFailure && callbacks.onFailure();
                });
            }
        });


        return Backbone;
    });
