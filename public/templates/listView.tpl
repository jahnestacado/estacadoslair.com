<div  class="panel  left-side">
    <a id="back-home" class="link-btn" href="#">
        <span class="icon icon-home"></span>
    </a>
    <div class="panel-heading">
        <h3 class="panel-title active">Available Posts</h3>
    </div>
    <div class="list-group">

        <% _.each( posts, function( post){ %>
        <a href=<%= post.getHashPath()%>  class="list-group-item" > <%= post.get("title") %> </a>
        <% }); %>

    </div>
</div>