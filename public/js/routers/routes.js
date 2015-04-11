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
        console.log("home");
        var router = this;
        window.curtain.close();

        if (!router.homeView) {
            router.homeView = new HomeView();
        }
        router.homeView.render();
    },
    loadLoginPage: function() {
        var router = this;
        window.curtain.close();

        if (!router.loginView) {
            router.loginView = new LoginView();
        }
        router.loginView.render();
    },
    loadBlogPage: function() {
        var router = this;
        window.curtain.open();

        if (!router.blogPostListView) {
            router.blogPostListView = new BlogPostListView();
        }
        router.blogPostListView.render();
    },
    loadBlogPost: function(id) {
        window.curtain.open();

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
        window.curtain.open();
        var router = this;
        var blogPost = new BlogPost();

        if (!router.blogPostListView) {
            router.blogPostListView = new BlogPostListView();
            router.blogPostListView.render();
        }

        if (!router.createBlogPostView) {
            router.createBlogPostView = new CreateBlogPostView();
        }
        router.createBlogPostView.render(blogPost);

    },
    loadUpdatePage: function() {
        window.curtain.open();
        var router = this;

        if (!router.editBlogPostListView) {
            router.editBlogPostListView = new EditBlogPostListView();
        }
        router.editBlogPostListView.render();
    },
    loadUpdatePostPage: function(id) {
        window.curtain.open();
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

var appRouter = new AppRouter();

Backbone.history.start();



