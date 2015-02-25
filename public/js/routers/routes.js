Backbone.pubSub = _.extend({}, Backbone.Events);

var AppRouter = Backbone.Router.extend({
    routes: {
        "": "home",
        "blog": "loadBlogPage",
        "blog/:id": "loadBlogPost",
        "newPost": "loadCreatePostPage",
        "update": "loadUpdatePage",
        "update/:id": "loadUpdatePostPage"
    },
    home: function() {
        console.log("loaded home");

    },
    loadBlogPage: function() {
        var router = this;
        $("#post-container").empty();
        $("#list-container").empty();

        if (!router.blogPostListView) {
            router.blogPostListView = new BlogPostListView();
        }
        router.blogPostListView.render();
    },
    loadBlogPost: function(id) {
        var router = this;
        var blogPost = new BlogPost({"_id": id});

        $("#post-container").empty();
        $("#list-container").empty();
        if (!router.blogPostListView) {
            router.blogPostListView = new BlogPostListView();
        }
        router.blogPostListView.render();
        if (!router.blogPostView) {
            router.blogPostView = new BlogPostView();
        }
        router.blogPostView.render(blogPost);
    },
    loadCreatePostPage: function() {
        var router = this;
        var blogPost = new BlogPost();

        $("#post-container").empty();
        $("#list-container").empty();
        if (!router.createBlogPostView) {
            router.createBlogPostView = new CreateBlogPostView();
        }
        router.createBlogPostView.render(blogPost);
    },
    loadUpdatePage: function() {
        var router = this;

        if (!router.editBlogPostListView) {
            router.editBlogPostListView = new EditBlogPostListView();
        }
        $("#post-container").empty();
        $("#list-container").empty();
        router.editBlogPostListView.render();
    },
    loadUpdatePostPage: function(id) {
        var router = this;
        var blogPost = new BlogPost({"_id": id});

        $("#post-container").empty();
        $("#list-container").empty();
        if (!router.editBlogPostListView) {
            router.editBlogPostListView = new EditBlogPostListView();
        }
        router.editBlogPostListView.render();

        if (!router.editBlogPostView) {
            router.editBlogPostView = new EditBlogPostView();
        }
        router.editBlogPostView.render(blogPost);
    }
});

var appRouter = new AppRouter();

Backbone.history.start();



