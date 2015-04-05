Backbone.pubSub = _.extend({}, Backbone.Events);

var curtain = new Curtain();

function fadeOutLinks() {
    $(".inline.link-btn").fadeOut(800);
}

function fadeInLinks() {
    $(".inline.link-btn").fadeIn(1200);
}

$(window).on('resize', function() {
    appRouter.navigate("/", {trigger: true});
});

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
        curtain.close();
        fadeInLinks();
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
        fadeOutLinks();
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



