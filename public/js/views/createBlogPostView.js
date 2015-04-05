var CreateBlogPostView = Backbone.View.extend({
    el: "#curtain-right",
    template: _.template($("#edit-blog-post-template").html()),
    render: function(blogPostModel) {
        var view = this;
        view.blogPostModel = blogPostModel;
        var contents = {
            buttonAction: "Save",
            title: "", //messes up title input field
            body: ""
        }
        view.$el.html(view.template(contents));
        CKEDITOR.replace("post-body", {
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
        view.blogPostModel.set("body", CKEDITOR.instances["post-body"].document.getBody().getHtml());
        view.blogPostModel.set("date", new Date());
        view.blogPostModel.save(view.blogPostModel.attributes);

    }
});