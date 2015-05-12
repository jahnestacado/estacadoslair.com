define(["backbone"], function(Backbone) {
    Backbone.bus = $.extend({}, Backbone.Events);
    require(["notificationView"]);

    Backbone.View = $.extend(Backbone.View, {
        onAccessGranted: function(callback) {
            $.get("/auth/isAuthorized")
                    .success(function() {
                        callback();
                    })
                    .error(function() {
                        Backbone.bus.trigger("notification", {
                            message: "Unauthorized action! Please login.",
                            status: "error"
                        });
                        require("routes").navigate("/login", {trigger: true});
                    });
        }
    });


    return Backbone;
});