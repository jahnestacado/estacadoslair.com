define([
    "blogPosts",
    "blogPostListView",
    "editBlogPostListView",
    "createBlogPostListView",
    "blogPostView",
    "editBlogPostView",
    "createBlogPostView"
], function(BlogPosts, BlogPostListView, EditBlogPostListView, CreateBlogPostListView, BlogPostView, EditBlogPostView, CreateBlogPostView) {

    var MasterDetailViewFactory = {
        getView: function(page){
            var view;
            switch(page){
                case "blog":
                view = new BlogPostListView({
                    blogPostView: new BlogPostView(),
                    blogPosts: new BlogPosts()
                });
                    break;
                case "edit":
                view = new EditBlogPostListView({
                    blogPostView: new EditBlogPostView(),
                    blogPosts: new BlogPosts()
                });
                    break;
                case "create":
                view = new CreateBlogPostListView({
                    blogPostView: new CreateBlogPostView(),
                    blogPosts: new BlogPosts()
                });
                    break;
            }
            return view;
        }
    };

    return  MasterDetailViewFactory;
});
