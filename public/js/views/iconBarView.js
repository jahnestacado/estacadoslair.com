var IconBarView = Backbone.View.extend({
    el: "#icon-bar",
    initialize: function() {
        var view = this;
        Backbone.pubSub.on("fadeOutIcons", view.fadeOutIcons, this);
    },
    template: _.template($("#icon-bar-template").html()),
    render: function() {
        var view = this;
        view.$el.html(view.template());
        view.fadeInIcons();
    },
    fadeOutIcons: function() {
        var view = this;
        view.$el.find(".inline.link-btn").fadeOut(800);
    },
    fadeInIcons: function() {
        var view = this;
        view.$el.find(".inline.link-btn").fadeIn(1200);
    }
});