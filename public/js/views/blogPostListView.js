var BlogPostListView = Backbone.View.extend({
    el: "#curtain-left",
    template: _.template($("#list-view-template").html()),
    render: function() {
        var view = this;
        var blogPosts = new BlogPosts();

        blogPosts.fetch({
            success: function(blogPosts) {
                view.$el.html(view.template({posts: blogPosts.models}));
                appRouter.navigate(document.URL.split("/#")[1].split("/")[0]+"/"+blogPosts.models[0].attributes._id, { trigger : true } );
            }
            
        });

    },
    events: {
        "click #back-btn": "closeCurtain"
    },
    closeCurtain: function(event) {
        var curtain = new Curtain();
        curtain.close();
        appRouter.navigate("/", {trigger: true});
    },
});