if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.hello.helpers({
    counter: function () {
      return Session.get('counter');
    }
  });

  Template.hello.events({
    'click button': function () {
      // increment the counter when button is clicked
      Session.set('counter', Session.get('counter') + 1);
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
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