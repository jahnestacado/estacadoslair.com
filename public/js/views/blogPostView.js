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
        render: function(blogPostModel) {
            var view = this;
            view.initDisqus();
            $(".curtain-B").scrollTop(0);

            if (blogPostModel) {
                view.$el.html(view.template(blogPostModel.attributes));
                view.showDisqus(blogPostModel);
            }

        },
        showDisqus: function(blogPostModel){
            var disqus_developer = 1;
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
    });

    return BlogPostView;
});
