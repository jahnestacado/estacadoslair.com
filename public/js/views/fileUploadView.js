define([
    "jquery",
    "underscore",
    "backbone",
    "text!fileUploadViewTemplate",
    "fileList"
], function($, _, Backbone, template, FileList) {

    var FileUploadView = Backbone.View.extend({
        el: $("<div class='upload-view'></div>"),
        initialize: function(options){
            var view = this;
            console.log(options, view)
             view.parentElQ = options.parentElQ;
        },
        template: _.template(template),
        render: function() {
            var view = this;
            view.parentElQ.find(".upload-view").remove()
            view.$el.html(view.template());
            view.parentElQ.append(view.$el);
        },
        events:{
            'click #upload' : "uploadFile"
        },
        uploadFile: function(event){
            event.preventDefault();
            event.stopImmediatePropagation();

            var view = this;
            var fileList = view.$el.find('#upload-form #input-file').prop("files");
            var files = new FileList(fileList);

            files.save(null,{
                success: function(){
                    view.$el.find("#input-file").val("");
                    Backbone.bus.trigger("notification", {
                        message: "Uploaded files!",
                        status: "success"
                    });
                },
                error: function(jqXHR, status, errorMessage){
                    var errors = JSON.parse(jqXHR.responseText);
                    errors.forEach(function(error){
                        Backbone.bus.trigger("notification", {
                            message: error,
                            status: "error"
                        });
                    });
                }
            });
        },
    });

    return FileUploadView;
});
