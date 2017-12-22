define([
    "jquery",
    "underscore",
    "backbone",
    "blogPostView",
    "createBlogPostView",
    "text!editBlogPostTemplate",
    "curtain",
    "moment",
    "bootstrap"
], function ($, _, Backbone, BlogPostView, CreateBlogPostView, viewTemplate, CURTAIN, moment) {

    var EditBlogPostView = CreateBlogPostView.extend({
        template: _.template(viewTemplate),
        render: function (blogPostModel) {
            var view = this;
            
            var onSuccess = function onSuccess(model){
                view.blogPostModel = model;
                var attributes = model && model.attributes;
                if(attributes) {
                    var contents = {
                        title: attributes.title,
                        body: attributes.body
                    };
                    view.$el.html(view.template(contents));
                    view.initCKEditor();
                }
            };

            BlogPostView.prototype.render.apply(view, [blogPostModel, onSuccess]);
        },
        events: {
            "click #update-post-btn": "savePost"
        },
        savePost: function (event) {
            event.preventDefault();
            var view = this;

            var editorContent = view.filterContent();
            view.blogPostModel.set({
                title: view.$el.find("#post-title").val(),
                body: editorContent,
                date: moment().format("MMM DD, YYYY / hh:mm A")
            });

            Backbone.bus.trigger("updateBlogPost", view.blogPostModel);
        },
    });

    return EditBlogPostView;
});
