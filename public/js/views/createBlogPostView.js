define([
    "jquery",
    "underscore",
    "backbone",
    "text!createBlogPostTemplate",
    "blogPostModel",
    "curtain",
    "moment",
    "ckeditor",
], function ($, _, Backbone, viewTemplate, BlogPostModel, CURTAIN, moment, CKEDITOR) {

    var CreateBlogPostView = Backbone.View.extend({
        initialize: function(){
            var view = this;
            view.blogPostModel = new BlogPostModel();
        },
        el: ".curtain-B",
        template: _.template(viewTemplate),
        render: function () {
            var view = this;
            view.$el.html(view.template());
            view.initCKEditor();
        },
        events: {
            "click #save-post-btn": "savePost"
        },
        savePost: function (event) {
            var view = this;
            event.preventDefault();

            var editorContent = view.filterContent();
            view.blogPostModel.set({
                title: view.$el.find("#post-title").val(),
                body: editorContent,
                date: moment().format("MMM DD, YYYY / hh:mm A")
            });

            Backbone.bus.trigger("createBlogPost", view.blogPostModel);
        },
        initCKEditor: function () {
            CKEDITOR
                .replace("post-body", {
                    extraPlugins: "codesnippet",
                    codeSnippet_theme: "ir_black"
                })
            ;
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
