Backbone.pubSub = _.extend({}, Backbone.Events);

var curtain = new Curtain();

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
        curtain.close();

        if (!router.iconBarView) {
            router.iconBarView = new IconBarView();
        }
        router.iconBarView.render();
    },
    loadLoginPage: function() {
        var router = this;
        curtain.close();
        Backbone.pubSub.trigger("fadeOutIcons");

        if (!router.loginView) {
            router.loginView = new LoginView();
        }
        router.loginView.render();
    },
    loadBlogPage: function() {
        var router = this;
        curtain.open();

        if (!router.blogPostListView) {
            router.blogPostListView = new BlogPostListView();
        }
        router.blogPostListView.render();
    },
    loadBlogPost: function(id) {
        curtain.open();
        Backbone.pubSub.trigger("fadeOutIcons");

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
        curtain.open();
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
        curtain.open();
        var router = this;

        if (!router.editBlogPostListView) {
            router.editBlogPostListView = new EditBlogPostListView();
        }
        router.editBlogPostListView.render();
    },
    loadUpdatePostPage: function(id) {
        curtain.open();
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



