define([
    "jquery",
    "underscore",
    "backbone"
], function($, _, Backbone) {

    var HomeView = Backbone.View.extend({
        el: "#icon-bar",
        initialize: function() {
            var view = this;

            // Attach fadeOutHomeView function on the bus in order to be accessible from other views
            Backbone.bus.on("fadeOutHomeView", view.fadeOutHome, view);
        },
        template: _.template($("#home-template").html()),
        render: function() {
            window.curtain.close();

            var view = this;
            view.$el.html(view.template());
            view.fadeInHome();
            view.logoChangeOnHover();
        },
        fadeOutHome: function() {
            var view = this;
            view.$el.find(".link-btn ").fadeOut(800);
            view.$el.find("#home-label").fadeOut(800);
            view.$el.find("#home-logo").fadeOut(800);
        },
        fadeInHome: function() {
            var view = this;
            view.$el.find(".link-btn ").fadeOut(0).fadeIn(1200);
            view.$el.find("#home-label").fadeOut(0).fadeIn(1500)
            view.$el.find("#home-logo").fadeOut(0).fadeIn(1800);
        },
        logoChangeOnHover: function() {
            var view = this;
            var fonts = [];
            for (var i = 1; i <= 9; i++) {
                fonts.push("font-" + i);
            }

            var myInterval = false;
            view.$el.find("#home-logo").mouseover(function() {
                myInterval = setInterval(function() {
                    var activeFont = fonts.shift();
                    view.$el.find("#home-logo").removeClass().addClass(activeFont);
                    fonts.push(activeFont)
                }, 50);
            });

            view.$el.find("#home-logo").mouseout(function() {
                clearInterval(myInterval);
            });
        },
        initializeFonts: function() {
            var elQ = $(".container").append(" <span id='font-loader'></span>")
            for (var i = 1; i <= 9; i++) {
                $("<span></span>").text("foo").addClass("font-" + i).appendTo("#font-loader");
            }

            setTimeout(function() {
                elQ.find("#font-loader").remove();
            }, 500);
        }
    });

    return HomeView;
});