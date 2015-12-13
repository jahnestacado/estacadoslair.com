<div  class="panel  left-side">
    <a id="back-home" class="link-btn">
        <span class="icon icon-home2"></span>
    </a>
    <div class="panel-heading">
        <h3 class="panel-title active">Available Posts</h3>
    </div>
    <ul class="list-group">

        <% _.each( posts, function( post){ %>
        <li><a id=<%= post.get("_id")%>  class="list-group-item" > <%= post.get("title") %> </a></li>
        <% }); %>

    </ul>
</div>
