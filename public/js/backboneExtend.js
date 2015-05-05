define(["backbone"], function(Backbone) {
    
    Backbone.View = $.extend(Backbone.View, {
        onAccessGranted: function(callback) {
            $.get("/auth/isAuthorized")
                    .success(function() {
                        callback();
                    })
                    .error(function() {
                        require("routes").navigate("/", {trigger: true});
                    });
        }
    });

    return Backbone;
});