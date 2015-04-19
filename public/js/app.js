require([
    "routes",
    "jquery",
    "underscore",
    "backbone",
    "curtain",
    "fontLoader",
    "snowFlakes",
], function(AppRouter, $, _, Backbone, Curtain) {

    $(document).ready(function() {
        $(window).on('resize', function() {
            window.appRouter.navigate("/", {trigger: true});
        });

        window.curtain = new Curtain();
        window.appRouter = new AppRouter();
        Backbone.bus = _.extend({}, Backbone.Events);
        Backbone.history.start();
    });
});