<div  class="panel panel read-only-panel">
    <div class="panel-heading">
        <h3 class="panel-title active">Available Posts</h3>
    </div>
    <div class="list-group">

        <% _.each( posts, function( post){ %>
        <a href=<%= post.getHashPath()%>  class="list-group-item" > <%= post.get("title") %> <button class="delete-btn btn-danger btn pull-right" data-id=<%= post.get("_id") %>>delete</button> </a>
        <% }); %>

    </div>
</div>