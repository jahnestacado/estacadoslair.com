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
            "": "home",
            "blog/:id": "loadBlogPost",
            "blog": "loadBlogPage",
            "create": "loadCreatePostPage",
            "update/:id": "loadUpdatePostPage",
            "update": "loadUpdatePage",
            "login": "loadLoginPage",
        },
        home: function() {
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
                router.navigate("blog", {trigger: true});
            } else {
                renderAndCacheView(router, {blogPostView: BlogPostView}, blogPost);
            }
        },
        loadCreatePostPage: function() {
            var router = this;

            renderAndCacheView(router, {blogPostListView: BlogPostListView});
            renderAndCacheView(router, {createBlogPostView: CreateBlogPostView});
        },
        loadUpdatePage: function() {
            var router = this;
            renderAndCacheView(router, {editBlogPostListView: EditBlogPostListView});
        },
        loadUpdatePostPage: function(id) {
            var router = this;
            var blogPost = new BlogPost({"_id": id});

            if (!router.editBlogPostListView) {
                router.navigate("update", {trigger: true});
            } else {
                renderAndCacheView(router, {editBlogPostView: EditBlogPostView}, blogPost);
            }

        }
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