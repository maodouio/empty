Res = new Meteor.Collection("res");

Res.allow({
  insert: function(){
    return true;
  },
  update: function(){
    return true;
  },
  remove: function(){
    return true;
  }
});

if (Meteor.isClient) {
  Accounts.ui.config({
    passwordSignupFields: 'USERNAME_ONLY'
    // passwordSignupFields: 'USERNAME_AND_OPTIONAL_EMAIL'
  });

  Meteor.subscribe("users");
  // counter starts at 0
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup

  });
  Meteor.publish("users", function(){
    return Meteor.users.find();
  });
}

var Post = LikeableModel.extend();

Posts._transform = function (document) {
   return new Post(document);
};

Post.prototype._collection = Posts;

// //BaseModel requires a prototype._collection so we do that here
// Post.prototype._collection = new Meteor.Collection("posts", {
//     transform: function(document){
//         return new Post(document);
//     }
// });

// //expose the collection on the Meteor global
// Meteor.posts = Post.prototype._collection;
