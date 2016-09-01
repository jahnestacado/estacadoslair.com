require([
    "jquery",
    "backboneExtended",
    "touchswipe",
    "fontLoader",
    "snowFlakes",
], function ($, Backbone) {
    require(["routes"], function (ROUTER) {
        $(document).ready(function () {
            Backbone.history.start({pushState: true, root: "/"});
            $(window).on("resize", function () {
                // When curtain is open on window resize navigate to home page
                if ($(".curtain-A-closed, .curtain-B-closed").length) {
                    ROUTER.navigate("/", {trigger: true});
                }
            });
        });
    });
});
