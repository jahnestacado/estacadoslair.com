define(
    [
        "jquery",
        "underscore",
        "backbone",
        "text!fileUploadViewTemplate",
        "fileListModel",
    ],
    function($, _, Backbone, template, FileListModel) {
        var FileUploadView = Backbone.View.extend({
            el: $("<div class='upload-view'></div>"),
            initialize: function(options) {
                var view = this;
                view.parentElQ = options.parentElQ;
            },
            template: _.template(template),
            render: function() {
                var view = this;
                new FileListModel().fetch({
                    success: function(data) {
                        var filenames = Object.values(data.attributes);
                        view.parentElQ.find(".upload-view").remove();
                        view.$el.html(view.template({ filenames: filenames }));
                        view.parentElQ.append(view.$el);
                    },
                    error: function() {},
                });
            },
            events: {
                "click #upload": "uploadFiles",
                "click .file-list li": "updateThumbnail",
                "click .file-list li .copy-btn": "copyFilepath",
                "click .file-list li .delete-btn": "deleteFile",
            },
            uploadFiles: function(event) {
                event.preventDefault();
                event.stopPropagation();
                
                var view = this;
                var fileList = view.$el
                .find("#upload-form #input-file")
                .prop("files");
                var files = new FileListModel(fileList);
                
                if(files.attributes.length) {
                    files.save(null, {
                        success: function() {
                            view.$el.find("#input-file").val("");
                            Backbone.bus.trigger("notification", {
                                message: "Uploaded files!",
                                status: "success",
                            });
                        },
                        error: function(jqXHR, status, errorMessage) {
                            var error = JSON.parse(jqXHR.responseText);
                            var msg = [
                                errorMessage,
                                error.code,
                                error.path,
                                error.storageErrors.join(","),
                            ].join(" ");
                            Backbone.bus.trigger("notification", {
                                message: msg,
                                status: "error",
                            });
                        },
                    });
                } else{
                    Backbone.bus.trigger("notification", {
                        message: "No upload files selected!",
                        status: "error",
                    });
                }
            },
            updateThumbnail: function(event) {
                var view = this;
                var fileItemElQ = $(event.target);
                var filename = fileItemElQ.text();
                view.$el
                .find(".thumbnail")
                .attr("src", "/images/uploads/" + filename);
            },
            copyFilepath: function(event) {
                event.stopPropagation();
                var view = this;
                var fileItemElQ = $(event.target).parent();
                var filename = fileItemElQ.attr("id");
                var filepath = [window.location.host, "images/uploads", filename].join("/"); 
                var tempElQ = $("<textarea>");
                view.$el.append(tempElQ);
                tempElQ.val(filepath).select();
                tempElQ.remove();
                
                try {
                    var successful = document.execCommand("copy");
                    var msg = successful ? "successful" : "unsuccessful";
                    Backbone.bus.trigger("notification", {
                        message: "Copied to clipboard " + filepath,
                        status: "success",
                    });
                } catch (err) {
                    console.log("Error, unable to copy path");
                }
            },
            deleteFile: function() {},
        });
        
        return FileUploadView;
    }
);
