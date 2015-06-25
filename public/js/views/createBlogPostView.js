define([
    "jquery",
    "underscore",
    "backbone",
    "text!createBlogPost",
    "blogPost",
    "curtain",
    "moment"
], function ($, _, Backbone, viewTemplate, BlogPost, CURTAIN, moment) {

    var CreateBlogPostView = Backbone.View.extend({
        el: "#curtain-right",
        template: _.template(viewTemplate),
        initialize: function (options) {
            var view = this;
            $.extend(view, options);
        },
        render: function () {
            var view = this;
            CURTAIN.open();

            view.$el.html(view.template());
            view.initCKEditor();
        },
        events: {
            "click #save-post-btn": "savePost"
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
                    view.listView.refresh();
                },
                error: function () {
                    Backbone.bus.trigger("notification", {
                        message: "Couldn't create post!",
                        status: "error"
                    });
                }
            });
        },
        initCKEditor: function () {
            CKEDITOR.replace("post-body", {
                extraPlugins: "codesnippet",
                codeSnippet_theme: "ir_black"
            });
        },
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