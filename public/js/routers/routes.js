Backbone.pubSub = _.extend({}, Backbone.Events);

var AppRouter = Backbone.Router.extend({
    routes: {
        "": "home",
        "blog/:id": "loadBlogPost",
        "blog": "loadBlogPage",
        "new": "loadCreatePostPage",
        "update/:id": "loadUpdatePostPage",
        "update": "loadUpdatePage"
    },
    home: function() {
        console.log("loaded home");
    },
    loadBlogPage: function() {
        var router = this;
        scrollTo($("#page2"));

        if (!router.blogPostListView) {
            router.blogPostListView = new BlogPostListView();
        }
        router.blogPostListView.render();
    },
    loadBlogPost: function(id) {
        var router = this;
        var blogPost = new BlogPost({"_id": id});
        if (!router.blogPostListView) {
            router.blogPostListView = new BlogPostListView();
            router.blogPostListView.render();
        }

        if (!router.blogPostView) {
            router.blogPostView = new BlogPostView();
        }
        router.blogPostView.render(blogPost);
    },
    loadCreatePostPage: function() {
        var router = this;
        var blogPost = new BlogPost();
        scrollTo($("#page2"));
        $("#list-container").empty();

        if (!router.createBlogPostView) {
            router.createBlogPostView = new CreateBlogPostView();
        }
        router.createBlogPostView.render(blogPost);

    },
    loadUpdatePage: function() {
        var router = this;
        scrollTo($("#page2"));

        if (!router.editBlogPostListView) {
            router.editBlogPostListView = new EditBlogPostListView();
        }
        router.editBlogPostListView.render();
    },
    loadUpdatePostPage: function(id) {
        var router = this;
        var blogPost = new BlogPost({"_id": id});

        if (!router.editBlogPostListView) {
            router.editBlogPostListView = new EditBlogPostListView();
            router.editBlogPostListView.render();
        }

        if (!router.editBlogPostView) {
            router.editBlogPostView = new EditBlogPostView();
        }
        router.editBlogPostView.render(blogPost);
    }
});

var scrollTo = function(el, ms) {
    var speed = (ms) ? ms : 600;
    $('html,body').animate({
        scrollTop: $(el).offset().top
    }, speed);
}

var appRouter = new AppRouter();

Backbone.history.start();



