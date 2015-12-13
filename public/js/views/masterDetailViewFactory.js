define([
    "blogPosts",
    "blogPostListView",
    "editBlogPostListView",
    "createBlogPostListView",
], function(BlogPosts, BlogPostListView, EditBlogPostListView, CreateBlogPostListView) {

    /*
     *Reference to blogPostsCollection.
     *Since BlogPostListView, EditBlogPostListView and CreateBlogPostListView share the exact same data they use the same collection reference
     *in order to avoid unnecessary requests to the server
     */
    var blogPostsCollection = new BlogPosts();
    var MasterDetailViewFactory = {
        getView: function(page){
            var view;
            switch(page){
                case "blog":
                view = new BlogPostListView(blogPostsCollection);
                    break;
                case "edit":
                view = new EditBlogPostListView(blogPostsCollection);
                    break;
                case "create":
                view = new CreateBlogPostListView(blogPostsCollection);
                    break;
            }
            return view;
        }
    };

    return  MasterDetailViewFactory;
});
