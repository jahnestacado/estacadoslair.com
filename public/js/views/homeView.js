var HomeView = Backbone.View.extend({
    el: "#icon-bar",
    initialize: function() {
        var view = this;
        Backbone.pubSub.on("fadeOutHomeView", view.fadeOutHome, view);
    },
    template: _.template($("#home-template").html()),
    render: function() {
        window.curtain.close();

        var view = this;
        view.$el.html(view.template());
        view.fadeInHome();
    },
    fadeOutHome: function() {
        var view = this;
        view.$el.fadeOut(800);
    },
    fadeInHome: function() {
        var view = this;
        view.$el.fadeIn(1200);
    }
});