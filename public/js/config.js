require.config({
    baseUrl: "../",
    deps: ["app"],
    paths: {
        "app": "js/app",
        "jquery": "bower_components/jquery/dist/jquery.min",
        "boostrap": "bower_components/bootstrap/dist/js/bootstrap.min",
        "ckeditor": "bower_components/ckeditor/ckeditor",
        "highlightjs": "bower_components/ckeditor/plugins/codesnippet/lib/highlight/highlight.pack",
        "underscore": "bower_components/underscore/underscore",
        "backbone": "bower_components/backbone/backbone",
        "text": "bower_components/text/text.js",
        "blogPost": "js/models/blogPost",
        "userAuth": "js/models/userAuth",
        "blogPostView": "js/views/blogPostView",
        "blogPosts": "js/collections/blogPosts",
        "blogPostListView": "js/views/blogPostListView",
        "editBlogPostListView": "js/views/editBlogPostListView",
        "createBlogPostView": "js/views/createBlogPostView",
        "editBlogPostView": "js/views/editBlogPostView",
        "loginView": "js/views/loginView",
        "homeView": "js/views/homeView",
        "curtain": "js/curtain",
        "snowFlakes": "js/snow-flakes-anim",
        "fontLoader": "js/fontLoader",
        "routes": "js/routers/routes"
    },
    shim: {
        'underscore': {
            'exports': '_'
        },
        'backbone': {
            'deps': ['jquery', 'underscore'],
            'exports': 'Backbone'
        },
        "ckeditor": {
            'deps': ['jquery'],
            'exports': 'CKEDITOR'
        },
        "highlightjs": ["ckeditor"],
        "bootstrap": ["jquery"]
    }
});