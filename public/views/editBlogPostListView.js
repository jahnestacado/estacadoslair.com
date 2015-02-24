var EditBlogPostListView = BlogPostListView.extend({
    initialize:function(){
      Backbone.pubSub.on("updateListView", this.onChange, this);  
    },
    template: _.template($("#edit-list-view-template").html()),
    events: {
        "click .delete-btn": "deletePost"
    },
    deletePost: function(event) {
        var id = $(event.target).data("id");
        var view = this;
        
        view.render();
        var blogPost = new BlogPost({_id: id});
        blogPost.destroy();
    },
    onChange : function(id) { 
        //Need to use id to highlight list-item
        var view = this;
        view.render();
  }
});
