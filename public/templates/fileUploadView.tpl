

<!-- Trigger the modal with a button -->
<button type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal">Open Large Modal</button>

<!-- Modal -->
<div class="modal fade" id="myModal" role="dialog">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Modal Header</h4>
            </div>
            <div class="modal-body">
                <form id="upload-form"  enctype="multipart/form-data">
                    <p><input id="input-file" type="file" name="uploaded-files[]" multiple>
                    <p><button id="upload">Upload</button>
                </form>

                <img class="thumbnail"></img>
                <ul class="list-group file-list">
                    <% _.each(filenames, function(filename){ %>
                    <li id=<%=filename%> class="list-group-item"><%=filename%><span class="copy-btn icon icon-paste"></span>
                        <span class="icon icon-cross delete-btn"></span>
                    </li>
                    <% }); %>
                </ul>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>
