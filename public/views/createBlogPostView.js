var CreateBlogPostView = Backbone.View.extend({
    el: "#post-container",
    initialize: function(id) {
        this.id = id;
    },
    template: _.template($("#edit-blog-post-template").html()),
    render: function() {
        var view = this;
        var contents = {
            buttonAction: "Save",
            title: "",
            body: ""
        }
        view.$el.html(view.template(contents));
    },
    events: {
        "click #submit-btn": "savePost"
    },
    savePost: function(event) {
        var view = this;
        event.preventDefault();

        var blogPost = new BlogPost();
        blogPost.set("title", view.$el.find("#title").val());
        blogPost.set("body", view.$el.find("#body").val());
        blogPost.set("date", new Date());
        blogPost.save(blogPost.attributes);

    }
});