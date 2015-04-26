require([
    "jquery",
    "underscore",
    "backbone",
    "routes",
    "fontLoader",
    "snowFlakes",
], function($, _, Backbone, ROUTER) {

    $(document).ready(function() {
        $(window).on('resize', function() {
            ROUTER.navigate("/", {trigger: true});
        });

        Backbone.bus = _.extend({}, Backbone.Events);
        Backbone.history.start();
    });
});