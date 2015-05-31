define([
    "jquery",
    "underscore",
    "backbone",
    "text!editBlogPostTemplate",
    "blogPost",
    "curtain",
    "moment"
], function ($, _, Backbone, viewTemplate, BlogPost, CURTAIN, moment) {

    var CreateBlogPostView = Backbone.View.extend({
        el: "#curtain-right",
        template: _.template(viewTemplate),
        render: function () {
            var view = this;
            Backbone.View.onAccessGranted(function () {
                CURTAIN.open();

                var contents = {
                    buttonAction: "Save",
                    title: "", //messes up title input field
                    body: ""
                };
                view.$el.html(view.template(contents));
                CKEDITOR.replace("post-body", {
                    extraPlugins: "codesnippet",
                    codeSnippet_theme: "monokai_sublime"
                });
            });
        },
        events: {
            "click #submit-btn:contains('Save')": "savePost"
        },
        savePost: function (event) {
            var view = this;
            event.preventDefault();
            var blogPostModel = new BlogPost();

            blogPostModel.set("title", view.$el.find("#post-title").val());
            var editorContent = view.filterContent();
            blogPostModel.set("body", editorContent);
            blogPostModel.set("date", moment().format("MMM DD, YYYY / hh:mm A"));
            blogPostModel.save(blogPostModel.attributes, {
                dataType: "text",
                success: function () {
                    Backbone.bus.trigger("notification", {
                        message: "Created post!",
                        status: "success"
                    });
                },
                error: function () {
                    Backbone.bus.trigger("notification", {
                        message: "Couldn't create post!",
                        status: "error"
                    });
                }
            });
        },
        //Duplicate code(see editBlogPostView). Will be DRYed when introduce concept of PageView
        filterContent: function () {
            //Workaround to remove handler icons which was servred over http and caused warnings + was ugly and of no use
            var contentElQ = CKEDITOR.instances["post-body"].document.getBody();
            var iconElQs = contentElQ.find("img.cke_reset.cke_widget_drag_handler");
            var numOfIcons = iconElQs.$.length;
            for (var i = 0; i <= numOfIcons - 1; i++) {
                iconElQs.getItem(i).remove();
            }

            return contentElQ.getHtml();
        }
    });

    return CreateBlogPostView;
});