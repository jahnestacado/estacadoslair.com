define([
    "jquery",
    "underscore",
    "backbone",
    "text!editBlogPostTemplate",
    "curtain",
    "moment"
], function ($, _, Backbone, viewTemplate, CURTAIN, moment) {

    var EditBlogPostView = Backbone.View.extend({
        el: "#curtain-right",
        template: _.template(viewTemplate),
        render: function (blogPostModel) {
            CURTAIN.open();
            var view = this;
            view.blogPostModel = blogPostModel;

            view.blogPostModel.fetch({
                success: function (blogPostModel) {
                    view.blogPostModel = blogPostModel;
                    var attributes = blogPostModel.attributes;
                    var contents = {
                        buttonAction: "Update",
                        title: attributes.title,
                        body: attributes.body
                    }
                    view.$el.html(view.template(contents));
                    CKEDITOR.replace("post-body", {
                        extraPlugins: "codesnippet",
                    });
                }
            });
        },
        events: {
            "click #submit-btn:contains('Update')": "savePost"
        },
        savePost: function (event) {
            event.preventDefault();

            var view = this;

            if (!view.blogPostModel) {
                view.blogPostModel = new BlogPost({"_id": view.id});
            }

            view.blogPostModel.set("title", view.$el.find("#post-title").val());
            var editorContent = view.filterContent();
            view.blogPostModel.set("body", editorContent);
            view.blogPostModel.set("date", moment().format("MMM DD, YYYY / hh:mm A"));
            view.blogPostModel.save(view.blogPostModel.attributes, {
                dataType: "text",
                success: function () {
                    Backbone.bus.trigger("notification", {
                        message: "Updated post!",
                        status: "success"
                    });

                    Backbone.bus.trigger("refreshEditListView", view.blogPostModel.id);
                },
                error: function () {
                    Backbone.bus.trigger("notification", {
                        message: "Couldn't update post!",
                        status: "error"
                    });
                }
            });

        },
        //Duplicate code(see createBlogPostView). Will be DRYed when introduce concept of PageView
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

    return EditBlogPostView;
});