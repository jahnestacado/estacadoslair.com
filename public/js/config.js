require.config({
    baseUrl: "/",
    deps: ["app"],
    paths: {
        //3rd Party libs
        "jquery":"./../node_modules/jquery/dist/jquery",
        "bootstrap": "./../node_modules/bootstrap/dist/js/bootstrap",
        "highlightjs": "./../node_modules/ckeditor/plugins/codesnippet/lib/highlight/highlight.pack",
        "underscore": "./../node_modules/underscore/underscore",
        "backbone": "./../node_modules/backbone/backbone",
        "text": "./../node_modules/requirejs-text/text",
        "moment": "./../node_modules/moment/moment",
        "curtainjs": "./../node_modules/curtainjs/js/jquery.curtain",
        "touchswipe": "./../node_modules/jquery-touchswipe/jquery.touchSwipe",
        "speakingurl": "./../node_modules/speakingurl/lib/speakingurl",
        "ckeditor": "./../node_modules/ckeditor/ckeditor",

        //Backbone models
        "blogPostModel": "js/models/blogPost",
        "userCredentialsModel": "js/models/user-credentials",
        "updateCredentialsModel": "js/models/update-credentials",
        "fileListModel": "js/models/file-list",

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
        "updateCredentialsView": "js/views/updateCredentialsView",
        "homeView": "js/views/homeView",
        "notificationView": "js/views/notificationView",
        "notFoundView": "js/views/pageNotFoundView",
        "adminPanelView": "js/views/adminPanelView",
        "fileUploadView": "js/views/fileUploadView",
        "masterDetailViewFactory": "js/views/masterDetailViewFactory",

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
        "updateCredentialsTemplate": "templates/updateCredentials.tpl",
        "editListViewTemplate": "templates/editListView.tpl",
        "blogPostTemplate": "templates/blogPost.tpl",
        "editBlogPostTemplate": "templates/editBlogPost.tpl",
        "notificationTemplate": "templates/notificationView.tpl",
        "notFoundTemplate": "templates/pageNotFoundView.tpl",
        "createBlogPostTemplate": "templates/createBlogPost.tpl",
        "adminPanelViewTemplate": "templates/adminPanelView.tpl",
        "fileUploadViewTemplate": "templates/fileUploadView.tpl",

        //Boot file
        "app": "js/app",
    },
    shim: {
        "touchswipe":{
            "deps": ["jquery"],
            "exports": "$"
        },
        "underscore": {
            "exports": "_"
        },
        "backbone": {
            "deps": ["underscore"],
            "exports": "Backbone"
        },
        "ckeditor": {
            "exports": "CKEDITOR"
        }
    }
});
