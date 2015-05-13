define([
    "backbone",
    "blogPostListView",
    "blogPost",
    "editBlogPostView",
    "homeView",
    "loginView",
    "blogPostView",
    "createBlogPostView",
    "editBlogPostListView",
], function(Backbone, BlogPostListView, BlogPost, EditBlogPostView, HomeView, LoginView, BlogPostView, CreateBlogPostView, EditBlogPostListView) {

    var AppRouter = Backbone.Router.extend({
        routes: {
            "": "loadHomePage",
            "blog/:id": "loadBlogPost",
            "blog": "loadBlogPage",
            "create": "loadCreatePostPage",
            "update/:id": "loadEditPost",
            "update": "loadEditBlogPage",
            "login": "loadLoginPage",
        },
        loadHomePage: function() {
            var router = this;
            renderAndCacheView(router, {homeView: HomeView});
        },
        loadLoginPage: function() {
            var router = this;
            renderAndCacheView(router, {loginView: LoginView});
        },
        loadBlogPage: function() {
            var router = this;
            renderAndCacheView(router, {blogPostListView: BlogPostListView});
        },
        loadBlogPost: function(id) {
            var router = this;
            var blogPost = new BlogPost({"_id": id});

            if (!router.blogPostListView) {
                router.loadBlogPage();
            } else {
                renderAndCacheView(router, {blogPostView: BlogPostView}, blogPost);
            }
        },
        loadCreatePostPage: function() {
            var router = this;
            renderAndCacheView(router, {blogPostListView: BlogPostListView});
            renderAndCacheView(router, {createBlogPostView: CreateBlogPostView});
        },
        loadEditBlogPage: function() {
            var router = this;
            renderAndCacheView(router, {editBlogPostListView: EditBlogPostListView});
        },
        loadEditPost: function(id) {
            var router = this;
            var blogPost = new BlogPost({"_id": id});

            if (!router.editBlogPostListView) {
                router.loadEditBlogPage();
            } else {
                renderAndCacheView(router, {editBlogPostView: EditBlogPostView}, blogPost);
            }
        },
    });

    function renderAndCacheView(router, View, renderedObj) {
        var viewName = Object.keys(View)[0];
        if (!router[viewName]) {
            router[viewName] = new View[viewName]();
        }

        if (renderedObj) {
            router[viewName].render(renderedObj);
        } else {
            router[viewName].render();
        }
    }

    return new AppRouter();
});