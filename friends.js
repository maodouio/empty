if (Meteor.isClient) {

  Template.userList.helpers({
    users: function(){
      return Meteor.users.find({_id: { $nin: [Meteor.userId()]}});
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
          Session.set(name, true);
          return res.status;
        } else {
          console.log("false");
          //Friends.findOne(id).update(id, $set{isfollowing: false});
          Session.set(name, false);
          return false;
        }
      });
      // console.log();
      ///return Session.get("isFollowing");
      //return Res.findOne(id).isfollowing;
      return Session.get(name);
    },
    // isFollowing: function() {
    //   Friends.
    // }
  });


  Template.userList.events({
    "click #follow": function(event, template){
      //console.log(this._id);
      if(!Meteor.userId()){
        alert("请先登录!");
      } else {
        Meteor.call("follow", this._id);
        // -----------------------------
        var userId = Meteor.userId();
        var followingId = this._id;
        var name = userId + followingId;
        Session.set(name, true);
        // ------------------------------
      }


    },
    "click #unfollow": function(event, template){
      //console.log(this._id);
      if(!Meteor.userId()){
        alert("请先登录!");
      } else {
        Meteor.call("unfollow", this._id);
        // -----------------------------
        var userId = Meteor.userId();
        var followingId = this._id;
        var name = userId + followingId;
        Session.set(name, false);
        // ------------------------------
      }
    }
  });
}
