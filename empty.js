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
  Session.setDefault('counter', 0);
  Template.userList.helpers({
    users: function(){
      return Meteor.users.find({});
      //return [{username:"abc"}, {username:"123"}];
    },
    status: function(){

    },
    getFollowing: function() {
      //console.log(this);
      //this.isfollowing = "abc";
      //var id = this._id;
      var userId = Meteor.userId();
      var followingId = this._id;
      var name = userId + followingId;

      //Res.insert({_id:id}, {});
      //
      Meteor.call("isfollowing", Meteor.userId(), this._id ,function(err,res){
        if (res) {
          console.log("true");
          Session.set(name, "true");
          return res.status;
        } else {
          console.log("false");
          //Friends.findOne(id).update(id, $set{isfollowing: false});
          Session.set(name, "false");
          return false;
        }
      });
      // console.log();
      ///return Session.get("isFollowing");
      //return Res.findOne(id).isfollowing;
      return Session.get(name);
    }
  });

  Template.hello.helpers({
    counter: function () {
      return Session.get('counter');
    }
  });
  Template.userList.events({
    "click #follow": function(event, template){
      //console.log(this._id);
      Meteor.call("follow", Meteor.userId(), this._id);
      // -----------------------------
      var userId = Meteor.userId();
      var followingId = this._id;
      var name = userId + followingId;
      Session.set(name, "true");
      // ------------------------------

    },
    "click #unfollow": function(event, template){
      //console.log(this._id);
      Meteor.call("unfollow", Meteor.userId(), this._id);
      // -----------------------------
      var userId = Meteor.userId();
      var followingId = this._id;
      var name = userId + followingId;
      Session.set(name, "false");
      // ------------------------------
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
