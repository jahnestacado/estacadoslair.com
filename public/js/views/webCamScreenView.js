define([
    "jquery",
    "underscore",
    "backbone",
    "text!webCamScreenViewTemplate"
], function($, _, Backbone, viewTemplate) {

    var WebCamScreenView = Backbone.View.extend({
        el: "#curtain-right",
        template: _.template(viewTemplate),
        initialize: function(){
            var view = this;
            view.animRef = undefined;
            Backbone.bus.on("updateMovementStatus", view.updateMovementStatus, view);
        },
        render: function () {
            var view = this;
            view.$el.html(view.template());
        },
        updateMovementStatus: function(action){
            var view = this;

            switch(action) {
                case "moving-up":
                    view.handleMovementStatus("up");
                    break;
                case "moving-down":
                    view.handleMovementStatus("down");
                    break;
                case "moving-left":
                    view.handleMovementStatus("left");
                    break;
                case "moving-right":
                    view.handleMovementStatus("right");
                    break;
                case "stopped-moving":
                    view.resetMovementStatusArrows();
                    break;
                case "up-limit-reached":
                    view.resetMovementStatusArrows();
                    view.$el.find("#movement-status-arrow-up").css({color:"red",visibility:"visible"});
                    break;
                case "down-limit-reached":
                    view.resetMovementStatusArrows();
                    view.$el.find("#movement-status-arrow-down").css({color:"red",visibility:"visible"});
                    break;
                case "left-limit-reached":
                    view.resetMovementStatusArrows();
                    view.$el.find("#movement-status-arrow-left").css({color:"red",visibility:"visible"});
                    break;
                case "right-limit-reached":
                    view.resetMovementStatusArrows();
                    view.$el.find("#movement-status-arrow-right").css({color:"red",visibility:"visible"});
                    break;
            }
        },
        handleMovementStatus: function(movement){
            var view = this;
            var arrowElQ = view.$el.find("#movement-status-arrow-" + movement);
            if(!arrowElQ.hasClass("active")){
                view.resetMovementStatusArrows();
                arrowElQ.css({visibility:"visible"});
                view.startBlinkingArrowAnimation(arrowElQ);
            }
        },
        startBlinkingArrowAnimation: function(elQ){
            var view = this;
            elQ.addClass("active");
            view.animRef = setInterval(function(){
                elQ.fadeOut(400).fadeIn(400);
            }, 800);
        },
        resetMovementStatusArrows: function(){
            var view = this;
            clearInterval(view.animRef);
            delete view.animRef;
            view.$el.find(".movement-direction-arrow")
            .removeClass("active")
            .css({
                color: "",
                visibility:"hidden"
            });
        },
    });

    return WebCamScreenView;
});
