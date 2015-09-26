define([
    "jquery",
    "underscore",
    "backbone",
    "socketIO",
    "text!webCamControlsViewTemplate",
], function($, _, Backbone, socketIO, viewTemplate) {

    var WebCamView = Backbone.View.extend({
        el: "#curtain-left",
        initialize: function(){
            var view = this;

            view.TRANSMISSION_INTERVAL = 200;
            view.clientId = Math.random();
            view.socket = socketIO.connect("192.168.1.101:8089");
            view.isSendingCommand = false;
            // view.registerLockControlsListener();
            // view.registerUnlockControlsListener();
            view.registerMovementStatusListener();
        },
        template: _.template(viewTemplate),
        render: function () {
            var view = this;
            view.$el.html(view.template());
        },
        sendCommand: function(command){
            var view = this;
            setTimeout(function() {
                view.socket.emit("movement-command", command, view.clientId);
                if (view.isSendingCommand) {
                    view.sendCommand(command);
                }
            }, view.TRANSMISSION_INTERVAL);
        },
        events: {
            "mousedown #up, #down, #left, #right": "onMouseDown",
            "mouseup #up, #down, #left, #right": "onMouseUp"
        },
        onMouseDown: function(e){
            var view = this;

            var command = e.target.id;
            view.isSendingCommand = true;
            view.sendCommand(command);
        },
        onMouseUp: function(){
            var view = this;
            // view.socket.emit("inactivate-clientId", view.clientId);
            view.isSendingCommand = false;
            // setTimeout(function() {
            //     view.socket.emit("inactivate-clientId", view.clientId);
            // }, view.TRANSMISSION_INTERVAL);
        },
        registerLockControlsListener: function(){
            var view = this;
            view.socket.on("lock-controls", function() {
                var controlsElQ = $("#arrow-keys");

                if (!controlsElQ.hasClass("locked")) {
                    controlsElQ.block({message: "locked"});
                    controlsElQ.addClass("locked");
                }
            });
        },
        registerUnlockControlsListener: function(){
            var view = this;
            view.socket.on("unlock-controls", function() {
                var controlsElQ = $("#arrow-keys");

                controlsElQ.unblock();
                controlsElQ.removeClass("locked");
            });
        },
        registerMovementStatusListener: function(){
            var view = this;
            view.socket.on("status", function(action){
                Backbone.bus.trigger("updateMovementStatus", action);
            });
        }
    });

    return WebCamView;
});
