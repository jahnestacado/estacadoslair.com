define(["backbone", "jquery"], function(Backbone, $) {
    Backbone.bus = $.extend({}, Backbone.Events);
    
    Backbone.View = $.extend(Backbone.View, {
        onAccessGranted: function(callbacks) {
            $.ajax({
                type: "GET",
                url: "/auth/isAuthorized",
                headers: { jwt: window.localStorage.getItem("jwt") },
                success: function() {
                    callbacks.onSuccess && callbacks.onSuccess();
                },
                error: function() {
                    callbacks.onFailure && callbacks.onFailure();
                },
            });
        },
    });
    
    return Backbone;
});
