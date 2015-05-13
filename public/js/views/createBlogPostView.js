define([
    "jquery",
    "underscore",
    "backbone",
    "ckeditor",
    "text!editBlogPostTemplate",
    "blogPost",
    "curtain"
], function($, _, Backbone, ckeditor, viewTemplate, BlogPost, CURTAIN) {

    var CreateBlogPostView = Backbone.View.extend({
        el: "#curtain-right",
        template: _.template(viewTemplate),
        render: function() {
            var view = this;
            Backbone.View.onAccessGranted(function() {
                CURTAIN.open();
                 
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
            });
        },
        events: {
            "click #submit-btn:contains('Save')": "savePost"
        },
        savePost: function(event) {
            var view = this;
            event.preventDefault();
            var blogPostModel = new BlogPost();

            blogPostModel.set("title", view.$el.find("#post-title").val());
            blogPostModel.set("body", ckeditor.instances["post-body"].document.getBody().getHtml());
            blogPostModel.set("date", new Date());
            blogPostModel.save(blogPostModel.attributes, {
                dataType: "text",
                success: function() {
                    Backbone.bus.trigger("notification", {
                        message: "Created post!",
                        status: "success"
                    });
                },
                error: function() {
                    Backbone.bus.trigger("notification", {
                        message: "Couldn't create post!",
                        status: "error"
                    });
                }
            });
        }
    });

    return CreateBlogPostView;
});