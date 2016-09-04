define([
    "jquery",
    "underscore",
    "backbone",
    "text!blogPostTemplate",
], function($, _, Backbone, viewTemplate) {

    var BlogPostView = Backbone.View.extend({
        el: ".curtain-B",
        initialize: function(){
            var view = this;

            var loadDisqusScript = function(){
                var disqusScript = document.createElement("script");
                disqusScript.src = "//estacadoslaircom.disqus.com/embed.js";
                disqusScript.async = true;
                disqusScript.setAttribute("data-timestamp", +new Date());
                document.head.appendChild(disqusScript);
            };

            view.initDisqus = _.once(loadDisqusScript);
        },
        template: _.template(viewTemplate),
        render: function(blogPostModel, onSuccess) {
            var view = this;
            $(".curtain-B").scrollTop(0);

            if(!onSuccess){
                onSuccess = function(model){
                    view.initDisqus();
                    view.$el.html(view.template(model.attributes));
                    view.showDisqus(model);
                };
            }

            if (blogPostModel && !blogPostModel.get("body")) {
                blogPostModel.fetch({success: onSuccess});
            } else {
                onSuccess(blogPostModel);
            }
        },
        showDisqus: function(blogPostModel){
            if(typeof DISQUS !== "undefined"){
                DISQUS.reset({
                    reload: true,
                    config: function () {
                        this.page.url = document.documentURI;
                        this.page.title = blogPostModel.get("title");
                        this.page.identifier = blogPostModel.get("_id");
                    }
                });
            } else{
                var disqus_shortname = "estacadoslaircom.disqus.com";
                var disqus_identifier= blogPostModel.get("_id");
                var disqus_url  = document.documentURI;
                var disqus_config = function () {
                    this.language = "en";
                };
            }
        },
        events: {
            "click ul.share-buttons": "share"
        },
        share: function(event){
            event.stopPropagation();
            var elQ = $(event.target);
            var title = encodeURIComponent($(".post-title").text());
            var postUrl = encodeURIComponent(document.URL);

            var url;
            switch(true){
                case(elQ.hasClass("twitter")):
                        url = "https://twitter.com/intent/tweet?text=" + title + ":%20"  + postUrl;
                    break;
                case(elQ.hasClass("linkedin")):
                        url = "https://www.linkedin.com/shareArticle?mini=true&url=" + postUrl + "&title=" + title;
                    break;
                case(elQ.hasClass("google+")):
                        url = "https://plus.google.com/share?url=" + postUrl;
                    break;
                case(elQ.hasClass("pocket")):
                        url = "https://getpocket.com/save?url=" + postUrl + "&title=" + title;
                    break;
                case(elQ.hasClass("wordpress")):
                        url = "https://wordpress.com/press-this.php?u=" + postUrl + "&t=" + title;
                    break;
                case(elQ.hasClass("mail")):
                        url = "mailto:?Subject="+ title + "&body=" + postUrl;
                    break;
            }

            window.open(url, "_blank").focus();
        }
    });

    return BlogPostView;
});
