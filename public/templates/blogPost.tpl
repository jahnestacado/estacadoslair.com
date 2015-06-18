<div  class="panel right-side">
    <h2 class="post-title"><%= title %></h2>
    <div class="panel-body post-body">
        <%= body %>
        <ul class="share-buttons">
            <li><a href="https://twitter.com/intent/tweet?source=&text=:%20" target="_blank" title="Tweet" onclick="window.open('https://twitter.com/intent/tweet?text=' + encodeURIComponent(document.title) + ':%20'  + encodeURIComponent(document.URL)); return false;"><img src="/images/twitter.png"></a></li>
            <li><a href="https://plus.google.com/share?url=" target="_blank" title="Share on Google+" onclick="window.open('https://plus.google.com/share?url=' + encodeURIComponent(document.URL)); return false;"><img src="/images/google+.png"></a></li>
            <li><a href="https://getpocket.com/save?url=&title=" target="_blank" title="Add to Pocket" onclick="window.open('https://getpocket.com/save?url=' + encodeURIComponent(document.URL) + '&title=' +  encodeURIComponent(document.title)); return false;"><img src="/images/pocket.png"></a></li>
            <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=&title=&summary=&source=" target="_blank" title="Share on LinkedIn" onclick="window.open('http://www.linkedin.com/shareArticle?mini=true&url=' + encodeURIComponent(document.URL) + '&title=' +  encodeURIComponent(document.title)); return false;"><img src="/images/linkedIn.png"></a></li>
            <li><a href="http://wordpress.com/press-this.php?u=&t=&s=" target="_blank" title="Publish on WordPress" onclick="window.open('http://wordpress.com/press-this.php?u=' + encodeURIComponent(document.URL) + '&t=' +  encodeURIComponent(document.title)); return false;"><img src="/images/wordpress.png"></a></li>
            <li><a href="mailto:?subject=&body=:%20" target="_blank" title="Email" onclick="window.open('mailto:?subject=' + encodeURIComponent(document.title) + '&body=' +  encodeURIComponent(document.URL)); return false;"><img src="/images/email.png"></a></li>
        </ul>
        <p class="date"><%= date %></p>
    </div>

</div>