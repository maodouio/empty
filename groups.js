if (Meteor.isClient) {
  Meteor.subscribe("groups");
  Meteor.subscribe("group");
  Meteor.subscribe("allgroup");

  Template.groupsList.helpers({
    groups: function() {
      return Groups.find();
    },
    ownerName: function() {
      return Meteor.users.findOne(this.ownerId).username;
    },
    users: function() {
      var idList = Groups.findOne(this._id).memberIds;
      var userList = _.map(idList, function(str){ return Meteor.users.findOne(str).username; });
      return userList;
    },
    isOwner: function() {
      var userId = Meteor.userId();
      var groupId = this._id;
      var name = userId + groupId + "Owner";

      Meteor.call("isOwner", Meteor.userId(), this._id, function(error, result){
        (result)?Session.set(name, true):Session.set(name, false);
      });
      return Session.get(name);
    },
    isInGroup: function() {
      var userId = Meteor.userId();
      var groupId = this._id;
      var name = userId + groupId;

      Meteor.call("isInGroup", Meteor.userId(), this._id, function(error, result){
        (result)?Session.set(name, true):Session.set(name, false);
      });
      return Session.get(name);
    }
  });


  Template.createGroup.events({
    "click #createGroup": function(e, t){
      if(!Meteor.userId()){
        alert("您必须先登录才能创建群组");
      } else {
        var groupName = $('[name=groupName]').val();
        // console.log(groupName);
        Meteor.call("createGroup", groupName, function(error, result){
          if(error){
            console.log("error", error);
          }
          if(result){
            console.log(groupName + "创建成功");
          }
        });
      }
    }
  });

  Template.groupsList.events({
    "click #join": function(event, template){

      console.log(this._id);
      console.log(Meteor.userId());
      Meteor.call("joinGroup", this._id,function(error, result){
        if(error){
          console.log("error", error);
        }
        if(result){
          console.log("已加入" + this.groupName);
        }
      });
    },
    "click #leave": function(event, template){

      console.log(this._id);
      console.log(Meteor.userId());
      Meteor.call("leaveGroup", this._id,function(error, result){
        if(error){
          console.log("error", error);
        }
        if(result){
          console.log("已退出" + this.groupName);
        }
      });
    },
    "click #delete": function(event, template){

      Meteor.call("removeGroup", this._id, function(error, result){
        if(error){
          console.log("error", error);
        }
        if(result){
          console.log("已删除" + this.groupName);
        }
      });
    }
  });


}


if(Meteor.isServer){
  Meteor.publish("allgroup", function(argument){
    return Groups.find();
  });
}
//
// joinGroup(userId, groupId) 加入群组
// leaveGroup(userId, groupId) 退出群组
// deleteGroup(groupId) 删除群组
