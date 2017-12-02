define([
    "jquery",
    "backbone",
    "text!listViewTemplate",
    "blogPostView",
    "curtain",
], function ($, Backbone, viewTemplate, BlogPostView, CURTAIN) {
    var BlogPostListView = Backbone.View.extend({
        el: ".curtain-A",
        template: _.template(viewTemplate),
        initialize: function (blogPosts) {
            var view = this;
            view.blogPostView = new BlogPostView();
            view.blogPosts = blogPosts;
            $.fn.swipe.defaults.excludedElements = "button, input, select, textarea, .noSwipe";
        },
        render: function (blogId) {
            var view = this;
            var updateUI = function(blogPosts){
                Backbone.bus.trigger("fadeOutHomeView");
                CURTAIN.open();
                view.$el.html(view.template({posts: blogPosts.models}));
                // If blogId is not specified pick first blog post
                blogId = blogId || blogPosts.models.length && blogPosts.models[0].get("_id") || null;
                view.renderBlogPost(blogId);
                
                if(view.isOrientationPortrait()){
                    view.$el.find(".list-group li").swipe({
                        swipe:function(event, direction) {
                            view.swipeBlogListItem(event, direction);
                        },
                        threshold:0
                    });
                }
            };
            var models = view.blogPosts.models
            var numOfBlogPosts = models.length;
            var shouldFetchData = !numOfBlogPosts;
            if(shouldFetchData){
                view.fetchBlogPosts(updateUI);
            } else{
                updateUI(view.blogPosts);
            }
        },
        isOrientationPortrait : function(){
            return $(window).innerWidth() < $(window).innerHeight();
        },
        fetchBlogPosts: function(onDone){
            var view = this;
            view.blogPosts.fetch({
                success: function (blogPosts) {
                    onDone(blogPosts);
                },
                error: function () {
                    Backbone.bus.trigger("notification", {message: "Failed to fetch blogPost collection!", status: "error"});
                }
            });
        },
        swipeBlogListItem: function(event,direction){
            var view = this;
            event.stopImmediatePropagation();
            var listElQ = $(event.target).parent();
            
            if(listElQ.hasClass("active")){
                listElQ.removeClass("active");
                var activeItemIndex = listElQ.index();
                var listItemElQs = listElQ.siblings();
                var numOfItems = listItemElQs.length;
                
                if(direction === "right" && activeItemIndex + 1 === numOfItems){
                    view.selectBlogPost(listItemElQs.first());
                } else if(direction === "left" && activeItemIndex === 0){
                    view.selectBlogPost(listItemElQs.last());
                } else{
                    var action = direction === "right" ? "next" : "prev";
                    view.selectBlogPost($(listElQ[action]()));
                }
            }
        },
        renderBlogPost: function (id) {
            var view = this;
            var selectedBlogPost = view.getModelFromCollection(id);
            if (selectedBlogPost) {
                $("#" + id).parent().addClass("active");
                view.updateGraphTags(selectedBlogPost);
                require("routes").navigate("#" + view.getPathDomain() + "/" + id + "/" + selectedBlogPost.get("slug"));
                view.blogPostView.render(selectedBlogPost);
            } else if(id === null){
                view.blogPostView.render(id);
            } else {
                require("routes").navigate("#not-found", {trigger: true});
            }
        },
        updateGraphTags: function(selectedBlogPost){
            var view = this;
            var tags = {
                title: selectedBlogPost.get("title"),
                description: $(selectedBlogPost.get("body")).text().substring(0, 300).replace(/\s/g," "),
                url: "https://estacadoslair.com/" + view.getPathDomain() + "/" + selectedBlogPost.get("id") + "/" + selectedBlogPost.get("slug"),
            };
            Object.keys(tags).forEach(function(key){
                $("meta[property='og\\:"+ key +"']").attr("content", tags[key]);
            });
        },
        events: {
            "click #back-home": "loadHomePage",
            "click .list-group li": "onSelectBlogPost",
        },
        getModelFromCollection: function(id){
            var view = this;
            return view.blogPosts.where({_id:id})[0];
        },
        loadHomePage: function () {
            CURTAIN.close();
            require("routes").navigate("/", {trigger: true});
        },
        onSelectBlogPost: function (event) {
            var view = this;
            var targetElQ = $(event.target).parent();
            view.selectBlogPost(targetElQ);
        },
        selectBlogPost: function (listElQ) {
            var view = this;
            var id = listElQ.find("a").attr("id");
            var model = view.getModelFromCollection(id);
            require("routes").navigate("#" + view.getPathDomain() + "/" + id + "/" + model.get("slug"), {trigger: true});
        },
        getPathDomain: function () {
            var pathDomain = document.URL.split("/")[3];
            return pathDomain;
        },
        refresh: function(id){
            var view = this;
            view.render(id);
        },
    });
    
    return BlogPostListView;
});
