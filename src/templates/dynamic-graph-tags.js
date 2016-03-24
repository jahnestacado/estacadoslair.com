var _ = require("underscore");
var dynamicGraphTags = '\n'+
'   <meta property="og:title" content="<%= post.title %>"/>\n'+
'   <meta property="og:url" content="<%= post.url %>"/>';

var DynamicGraphTags = function(post){
    return _.template(dynamicGraphTags)({post:post});
};

module.exports = DynamicGraphTags;
