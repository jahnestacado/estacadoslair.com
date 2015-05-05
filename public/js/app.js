define([
    "jquery",
    "underscore",
    "backboneExtended",
    "routes",
    "fontLoader",
    "snowFlakes",
], function($, _, Backbone, ROUTER) {

    Backbone.bus = _.extend({}, Backbone.Events);
    Backbone.history.start();
    
    $(document).ready(function() {
        $(window).on('resize', function() {
            ROUTER.navigate("/", {trigger: true});
        });
    });
});