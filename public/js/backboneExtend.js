define(["backbone"], function (Backbone) {
    Backbone.bus = $.extend({}, Backbone.Events);

    Backbone.View = $.extend(Backbone.View, {
        onAccessGranted: function (callbacks) {
            $.get("/auth/isAuthorized")
                    .success(function () {
                        callbacks.onSuccess && callbacks.onSuccess();
                    })
                    .error(function () {
                        callbacks.onFailure && callbacks.onFailure();
                    });
        }
    });


    return Backbone;
});