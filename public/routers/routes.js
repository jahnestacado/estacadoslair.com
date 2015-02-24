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
        $("#post-container").empty();
        var blogPostListView = new BlogPostListView();
        blogPostListView.render();
    },
    loadBlogPost: function(id) {
        $("#post-container").empty();
        var blogPostListView = new BlogPostListView();
        blogPostListView.render();
        var blogPostView = new BlogPostView(id);
        blogPostView.render();
    },
    loadCreatePostPage: function() {
        $("#post-container").empty();
        $("#list-container").empty();
        var createBlogPostView = new CreateBlogPostView();
        createBlogPostView.render();
    },
    loadUpdatePage: function() {
        $("#post-container").empty();
        $("#list-container").empty();
        var editBlogPostListView = new EditBlogPostListView();
        editBlogPostListView.render();
    },
    loadUpdatePostPage: function(id) {
        $("#post-container").empty();
        $("#list-container").empty();
        var editBlogPostListView = new EditBlogPostListView();
        editBlogPostListView.render();
        var editBlogPostView = new EditBlogPostView(id);
        editBlogPostView.render();
    }
});

var appRouter = new AppRouter();

Backbone.history.start();



