define(["backbone"], function(Backbone) {

    var BlogPost = Backbone.Model.extend({
        defaults: {
            title: "Unset",
            date: "Unset",
            body: "empty",
        },
        idAttribute: "_id",
        initialize: function(options) {
            var model = this;

            if (options && options._id) {
                model.set("_id", options._id);
            }
        },
        url: function() {
            var id = this.get("_id");
            var url;

            if (id) {
                url = "/blog/articles/" + this.get("_id");
            } else {
                url = "/blog/articles";
            }
            return url;
        },
        getPathDomain: function() {
            var pathDomain = document.URL.split("/#")[1].split("/")[0];
            return pathDomain;
        },
        getHashPath: function() {
            return "#" + this.getPathDomain() + "/" + this.get("_id");
        },
    });

    return BlogPost;
});


