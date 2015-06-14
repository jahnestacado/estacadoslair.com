require([
    "jquery",
    "backboneExtended",
    "fontLoader",
    "snowFlakes",
], function ($, Backbone) {

    require(["routes"], function (ROUTER) {
        $(document).ready(function () {
            Backbone.history.start({pushState: true});
            $(window).on("resize", function () {
                // When curtain is open on window resize navigate to home page and close it
                if ($("#curtain-left, #curtain-right").is(":visible")) {
                    ROUTER.navigate("/", {trigger: true});
                }
            });
        });
    });

});