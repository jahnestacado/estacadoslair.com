define([
    "jquery",
    "underscore",
    "backbone",
    "text!homeTemplate",
    "curtain",
], function($, _, Backbone, template, CURTAIN, ROUTER) {

    var HomeView = Backbone.View.extend({
        el: "#icon-bar",
        initialize: function() {
            var view = this;
            // Attach fadeOutHomeView function on the bus in order to be accessible from other views
            Backbone.bus.on("fadeOutHomeView", view.fadeOutHome, view);
        },
        template: _.template(template),
        render: function() {
            CURTAIN.close();
            var view = this;
            view.$el.html(view.template());
            view.fadeInHome();
            view.logoChangeOnHover();
        },
        fadeOutHome: function() {
            var view = this;
            view.$el.children().fadeOut(800);
        },
        fadeInHome: function() {
            var view = this;
            view.$el.children().fadeOut(0).fadeIn(800);
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
        },
        events: {
            "click #blog-icon": "openBlogPage"
        },
        openBlogPage: function() {
            require("routes").navigate("/blog", {trigger: true});
        }
    });

    return HomeView;
});
