var _ = require("underscore");
var dynamicGraphTags = '<!-- <Dynamic graph-tags> -->\n'+
'   <meta property="og:title" content="<%= post.title %>"/>\n'+
'   <meta property="og:description" content="<%= post.description %>"/>\n'+
'   <meta property="og:url" content="<%= post.url %>"/>\n'+
'<!-- </Dynamic graph-tags> -->';

var DynamicGraphTags = function(post){
    return _.template(dynamicGraphTags)({post:post});
};

module.exports = DynamicGraphTags;
