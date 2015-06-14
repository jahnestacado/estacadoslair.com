require([
    "jquery",
    "underscore",
    "backboneExtended",
    "text!notificationTemplate",
], function ($, _, Backbone, viewTemplate) {

    var NotificationView = Backbone.View.extend({
        initialize: function () {
            var view = this;
            Backbone.bus.on("notification", view.render, view);
        },
        el: "body",
        template: _.template(viewTemplate),
        render: function (message) {
            var view = this;
            var statusClass = view.statusCssClass[message.status];
            var notification = $.extend(message, {statusClass: statusClass});

            $(view.template(notification))
                    .appendTo(view.$el)
                    .fadeOut(5000, function () {
                        $(this).remove();
                    });
        },
        statusCssClass: {
            error: "alert-danger alert-error",
            success: "alert-success"
        }
    });

    new NotificationView();
});
