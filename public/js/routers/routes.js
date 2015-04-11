
Backbone.pubSub = _.extend({}, Backbone.Events);
window.curtain = new Curtain();

$(window).on('resize', function() {
    appRouter.navigate("/", {trigger: true});
});

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
        window.curtain.close();
        renderAndCacheView(router, {homeView: HomeView});
    },
    loadLoginPage: function() {
        var router = this;
        window.curtain.close();
        renderAndCacheView(router, {loginView: LoginView});
    },
    loadBlogPage: function() {
        var router = this;
        window.curtain.open();
        renderAndCacheView(router, {blogPostListView: BlogPostListView});
    },
    loadBlogPost: function(id) {
        var router = this;
        window.curtain.open();

        var router = this;
        var blogPost = new BlogPost({"_id": id});
        if (!router.blogPostListView) {
            router.navigate("blog", {trigger: true});
        } else {
            renderAndCacheView(router, {blogPostView: BlogPostView}, blogPost);
        }
    },
    loadCreatePostPage: function() {
        window.curtain.open();
        var router = this;
        var blogPost = new BlogPost();

        renderAndCacheView(router, {blogPostListView: BlogPostListView});
        renderAndCacheView(router, {createBlogPostView: CreateBlogPostView}, blogPost);
    },
    loadUpdatePage: function() {
        window.curtain.open();
        var router = this;
        renderAndCacheView(router, {editBlogPostListView: EditBlogPostListView});
    },
    loadUpdatePostPage: function(id) {
        window.curtain.open();
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

window.appRouter = new AppRouter();

Backbone.history.start();

