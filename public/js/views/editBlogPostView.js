define([
    "jquery",
    "underscore",
    "backbone",
    "ckeditor",
    "text!editBlogPostTemplate",
    "curtain",
    "moment"
], function($, _, Backbone, ckeditor, viewTemplate, CURTAIN, moment) {

    var EditBlogPostView = Backbone.View.extend({
        el: "#curtain-right",
        initialize: function() {
            var view = this;
            Backbone.bus.on("hideEditBlogPostView", view.onChange, view);
        },
        template: _.template(viewTemplate),
        render: function(blogPostModel) {
            CURTAIN.open();
MM = moment;
            var view = this;
            view.blogPostModel = blogPostModel;

            view.blogPostModel.fetch({
                success: function(blogPostModel) {
                    view.blogPostModel = blogPostModel;
                    var attributes = blogPostModel.attributes;
                    var contents = {
                        buttonAction: "Update",
                        title: attributes.title,
                        body: attributes.body
                    }
                    view.$el.html(view.template(contents));
                    ckeditor.replace("post-body", {
                        extraPlugins: 'codesnippet',
                        codeSnippet_theme: 'monokai_sublime'
                    });
                }
            });

            view.$el.show();
        },
        events: {
            "click #submit-btn:contains('Update')": "savePost"
        },
        savePost: function(event) {
            event.preventDefault();

            var view = this;

            if (!view.blogPostModel) {
                view.blogPostModel = new BlogPost({"_id": view.id});
            }

            view.blogPostModel.set("title", view.$el.find("#post-title").val());
            view.blogPostModel.set("body", ckeditor.instances["post-body"].document.getBody().getHtml());
            view.blogPostModel.set("date", moment().format("MMM DD, YYYY / hh:mm A"));
            view.blogPostModel.save(view.blogPostModel.attributes, {
                dataType: "text",
                success: function() {
                    Backbone.bus.trigger("notification", {
                        message: "Updated post!",
                        status: "success"
                    });
                },
                error: function() {
                    Backbone.bus.trigger("notification", {
                        message: "Couldn't update post!",
                        status: "error"
                    });
                }
            });

            Backbone.bus.trigger("refreshEditListView");
        },
        hideEditBlogPostView: function() {
            var view = this;
            view.$el.hide();
        }
    });

    return EditBlogPostView;

});