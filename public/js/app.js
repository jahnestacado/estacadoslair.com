require([
    "routes",
    "jquery",
    "underscore",
    "backbone",
    "fontLoader",
    "snowFlakes",
], function(AppRouter, $, _, Backbone) {

    $(document).ready(function() {
        $(window).on('resize', function() {
            window.appRouter.navigate("/", {trigger: true});
        });

        window.appRouter = new AppRouter();
        Backbone.bus = _.extend({}, Backbone.Events);
        Backbone.history.start();
    });
});