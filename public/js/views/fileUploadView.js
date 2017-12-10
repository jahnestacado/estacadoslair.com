define([
    "jquery",
    "underscore",
    "backbone",
    "text!fileUploadViewTemplate",
    "fileListModel"
], function($, _, Backbone, template, FileListModel) {
    
    var FileUploadView = Backbone.View.extend({
        el: $("<div class='upload-view'></div>"),
        initialize: function(options){
            var view = this;
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
            event.stopPropagation();
            event.stopImmediatePropagation();
            
            var view = this;
            var fileList = view.$el.find('#upload-form #input-file').prop("files");
            var files = new FileListModel(fileList);
            
            files.save(null,{
                success: function(){
                    view.$el.find("#input-file").val("");
                    Backbone.bus.trigger("notification", {
                        message: "Uploaded files!",
                        status: "success"
                    });
                },
                error: function(jqXHR, status, errorMessage){
                    var error = JSON.parse(jqXHR.responseText);
                    var msg = [errorMessage, error.code, error.path, error.storageErrors.join(",")].join(" ");
                    Backbone.bus.trigger("notification", {
                        message: msg,
                        status: "error"
                    });
                }
            });
        },
    });
    
    return FileUploadView;
});
