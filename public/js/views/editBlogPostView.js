define([
    "jquery",
    "underscore",
    "backbone",
    "createBlogPostView",
    "text!editBlogPostTemplate",
    "curtain",
    "moment"
], function ($, _, Backbone, CreateBlogPostView, viewTemplate, CURTAIN, moment) {

    var EditBlogPostView = CreateBlogPostView.extend({
        template: _.template(viewTemplate),
        render: function (blogPostModel) {
            CURTAIN.open();
            var view = this;

            view.blogPostModel = blogPostModel;
            var attributes = blogPostModel.attributes;
            var contents = {
                title: attributes.title,
                body: attributes.body
            };
            view.$el.html(view.template(contents));
            view.initCKEditor();
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

            view.blogPostModel.save(view.blogPostModel.attributes, {
                dataType: "text",
                success: function () {
                    Backbone.bus.trigger("notification", {
                        message: "Updated post!",
                        status: "success"
                    });
                    // Backbone.bus.trigger("refreshEditBlogPostListView", view.blogPostModel.id);
                },
                error: function () {
                    Backbone.bus.trigger("notification", {
                        message: "Couldn't update post!",
                        status: "error"
                    });
                }
            });


        },
    });

    return EditBlogPostView;
});
