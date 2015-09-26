require.config({
    baseUrl: "../",
    deps: ["app"],
    paths: {
        //3rd Party libs
        "jquery": "bower_components/jquery/dist/jquery",
        "boostrap": "bower_components/bootstrap/dist/js/bootstrap",
        "highlightjs": "bower_components/ckeditor/plugins/codesnippet/lib/highlight/highlight.pack",
        "underscore": "bower_components/underscore/underscore",
        "backbone": "bower_components/backbone/backbone",
        "text": "bower_components/text/text",
        "moment": "bower_components/moment/moment",
        "socketIO": "bower_components/socket.io-client/socket.io",
        "blockui": "bower_components/blockui/jquery.blockUI.js",

        //Backbone models
        "blogPost": "js/models/blogPost",
        "userAuth": "js/models/userAuth",

        //Backbone collections
        "blogPosts": "js/collections/blogPosts",

        //Backbone views
        "blogPostView": "js/views/blogPostView",
        "blogPostListView": "js/views/blogPostListView",
        "editBlogPostListView": "js/views/editBlogPostListView",
        "createBlogPostView": "js/views/createBlogPostView",
        "createBlogPostListView": "js/views/createBlogPostListView",
        "editBlogPostView": "js/views/editBlogPostView",
        "loginView": "js/views/loginView",
        "homeView": "js/views/homeView",
        "notificationView": "js/views/notificationView",
        "notFoundView": "js/views/pageNotFoundView",
        "webCamView": "js/views/webCamView",
        "webCamControlsView": "js/views/webCamControlsView",
        "webCamScreenView": "js/views/webCamScreenView",
        "adminPanelView": "js/views/adminPanelView",

        //Backbone routes
        "routes": "js/routers/routes",

        //Misc js deps
        "curtain": "js/curtain",
        "snowFlakes": "js/snow-flakes-anim",
        "fontLoader": "js/fontLoader",
        "backboneExtended": "js/backboneExtend",

        //Underscore templates
        "homeTemplate": "templates/home.tpl",
        "listViewTemplate": "templates/listView.tpl",
        "loginTemplate": "templates/login.tpl",
        "editListViewTemplate": "templates/editListView.tpl",
        "blogPostTemplate": "templates/blogPost.tpl",
        "editBlogPostTemplate": "templates/editBlogPost.tpl",
        "notificationTemplate": "templates/notificationView.tpl",
        "notFoundTemplate": "templates/pageNotFoundView.tpl",
        "createBlogPostTemplate": "templates/createBlogPost.tpl",
        "adminPanelViewTemplate": "templates/adminPanelView.tpl",
        "webCamControlsViewTemplate": "templates/webCamControlsView.tpl",
        "webCamScreenViewTemplate": "templates/webCamScreenView.tpl",

        //Boot file
        "app": "js/app",
    },
    shim: {
        "underscore": {
            "exports": "_"
        },
        // "blockui": {
        //     "deps":["jquery"],
        //     "exports": "blockUI"
        // },
        "backbone": {
            "deps": ["underscore"],
            "exports": "Backbone"
        },
    }
});
