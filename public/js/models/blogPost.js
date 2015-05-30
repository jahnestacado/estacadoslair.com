define(["backbone"], function (Backbone) {

    var BlogPost = Backbone.Model.extend({
        defaults: {
            title: "Undefined",
            date: "Undefined",
            body: "Undefined",
        },
        idAttribute: "_id",
        initialize: function (options) {
            var model = this;

            if (options && options._id) {
                model.set("_id", options._id);
            }
        },
        url: function () {
            var id = this.get("_id");
            var url;

            if (id) {
                url = "/blog/articles/" + this.get("_id");
            } else {
                url = "/blog/articles";
            }

            return url;
        }
    });

    return BlogPost;
});


