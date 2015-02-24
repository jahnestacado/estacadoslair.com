var EditBlogPostView = Backbone.View.extend({
    el: "#post-container",
    initialize: function(id) {
        this.id = id;
    },
    template: _.template($("#edit-blog-post-template").html()),
    render: function() {
        var view = this;
        var blogPost = new BlogPost({"_id": view.id});
        blogPost.fetch({
            success: function(blogPost) {
                var model = blogPost.attributes;
                var contents = {
                    buttonAction: "Update",
                    title: model.title,
                    body: model.body
                }
                view.$el.html(view.template(contents));
            }
        });

    },
    events: {
        "click #submit-btn": "savePost"
    },
    savePost: function(event) {
        event.preventDefault();
        var view = this;
        var blogPost = new BlogPost({"_id": view.id});
        
        blogPost.set("title", view.$el.find("#title").val());
        blogPost.set("body", view.$el.find("#body").val());
        blogPost.set("date", new Date());
        blogPost.save(blogPost.attributes);
        
        Backbone.pubSub.trigger("updateListView", { 'id' : this.id } );
    }
});