define(["backbone", "underscore"], function(Backbone, _) {

    var FileModel = Backbone.Model.extend({
        initialize: function(fileList){
            if(fileList && _.isObject(fileList)) {
                var model = this;
                model.data = new FormData();
                Object.keys(fileList).forEach(function(fileKey){
                    model.data.append("uploaded-files", fileList[fileKey]);
                });
            }
        },
        url: "/file-storage",
        save: function(extraData, options){
            var model = this;

            $.ajax({
                url: model.url,
                type: "POST",
                data: model.data,
                cache: false,
                dataType: "text",
                processData: false, // Don't process the files
                contentType: false,
                success: function(){
                    options.success && options.success();
                },
                error: function(jqXHR, status, errorMessage){
                    options.error && options.error(jqXHR, status, errorMessage);
                }
            });
        },
    });

    return FileModel;
});
