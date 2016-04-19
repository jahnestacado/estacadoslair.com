<div  class="panel">
    <h2 class="post-title"><%= title %></h2>
    <div class="panel-body post-body">
        <%= body %>
        <ul class="share-buttons">
            <li><a  target="_blank" title="Tweet" onclick="window.open('https://twitter.com/intent/tweet?text=' + encodeURIComponent(document.title) + ':%20'  + encodeURIComponent(document.URL)); return false;"><img class="hvr-float" src="/images/twitter.png"></a></li>
            <li><a  target="_blank" title="Share on Google+" onclick="window.open('https://plus.google.com/share?url=' + encodeURIComponent(document.URL)); return false;"><img class="hvr-float" src="/images/google+.png"></a></li>
            <li><a  target="_blank" title="Add to Pocket" onclick="window.open('https://getpocket.com/save?url=' + encodeURIComponent(document.URL) + '&title=' +  encodeURIComponent(document.title)); return false;"><img class="hvr-float" src="/images/pocket.png"></a></li>
            <li><a  target="_blank" title="Share on LinkedIn" onclick="window.open('https://www.linkedin.com/shareArticle?mini=true&url=' + encodeURIComponent(document.URL) + '&title=' +  encodeURIComponent(document.title)); return false;"><img class="hvr-float" src="/images/linkedIn.png"></a></li>
            <li><a  target="_blank" title="Publish on WordPress" onclick="window.open('https://wordpress.com/press-this.php?u=' + encodeURIComponent(document.URL) + '&t=' +  encodeURIComponent(document.title)); return false;"><img class="hvr-float" src="/images/wordpress.png"></a></li>
            <li><a  target="_blank" title="Email" onclick="window.open('mailto:?subject=' + encodeURIComponent(document.title) + '&body=' +  encodeURIComponent(document.URL)); return false;"><img class="hvr-float" src="/images/email.png"></a></li>
        </ul>

        <p class="date"><%= date %></p>

        <div id="disqus_thread"></div>
    </div>

</div>
