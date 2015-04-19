define([
    "jquery",
    "underscore",
    "backbone",
    "ckeditor",
    "text!editBlogPostTemplate",
    "curtain"
], function($, _, Backbone, ckeditor, viewTemplate, CURTAIN) {

    var CreateBlogPostView = Backbone.View.extend({
        el: "#curtain-right",
        template: _.template(viewTemplate),
        render: function(blogPostModel) {
            CURTAIN.open();

            var view = this;
            view.blogPostModel = blogPostModel;
            var contents = {
                buttonAction: "Save",
                title: "", //messes up title input field
                body: ""
            }
            view.$el.html(view.template(contents));
            ckeditor.replace("post-body", {
                extraPlugins: "codesnippet",
                codeSnippet_theme: "monokai_sublime"
            });
        },
        events: {
            "click #submit-btn:contains('Save')": "savePost"
        },
        savePost: function(event) {
            var view = this;
            event.preventDefault();

            view.blogPostModel.set("title", view.$el.find("#post-title").val());
            view.blogPostModel.set("body", ckeditor.instances["post-body"].document.getBody().getHtml());
            view.blogPostModel.set("date", new Date());
            view.blogPostModel.save(view.blogPostModel.attributes);

        }
    });

    return CreateBlogPostView;
});