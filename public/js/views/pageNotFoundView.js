define([
    "jquery",
    "underscore",
    "backbone",
    "text!notFoundTemplate",
    "curtain"
], function($, _, Backbone, template, CURTAIN) {

var PageNotFoundView = Backbone.View.extend({
        el: "#icon-bar",
        template: _.template(template),
        render: function() {
            CURTAIN.close();

            var view = this;
            view.$el.html(view.template());
            view.$el
                .children()
                .hide()
                .fadeIn(1200)
        },
    });
    
    return PageNotFoundView;
});