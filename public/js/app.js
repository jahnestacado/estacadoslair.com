require([
    "jquery",
    "backboneExtended",
    "routes",
    "fontLoader",
    "snowFlakes",
], function($, Backbone, ROUTER) {

    Backbone.history.start();
    require(["notificationView"]);

    $(document).ready(function() {
        $(window).on('resize', function() {
            ROUTER.navigate("/", {trigger: true});
        });
    });
});