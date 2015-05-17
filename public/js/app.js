require([
    "jquery",
    "backboneExtended",
    "routes",
    "fontLoader",
    "snowFlakes",
], function($, Backbone) {
    
    require(["routes"], function(ROUTER) {
        $(document).ready(function() {
            Backbone.history.start();
            $(window).on('resize', function() {
                ROUTER.navigate("/", {trigger: true});
            });
        });
    });

});