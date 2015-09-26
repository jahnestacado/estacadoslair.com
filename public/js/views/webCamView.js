define([
    "jquery",
    "underscore",
    "backboneExtended",
    "webCamControlsView",
    "webCamScreenView",
    "curtain"
], function($, _, Backbone, WebCamControlsView, WebCamScreenView, CURTAIN) {

var WebCamView = Backbone.View.extend({
        initialize: function(){
            var view = this;
            view.webCamControlsView = new WebCamControlsView();
            view.webCamScreenView = new WebCamScreenView();
        },
        render: function() {
            var view = this;
            CURTAIN.open();
            view.webCamScreenView.render();
            view.webCamControlsView.render();
        },
    });

    return WebCamView;
});
