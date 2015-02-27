Meteor.startup(function () {
    // code to run on server at startup
});

Accounts.onCreateUser(function(options, user) {
  if(Meteor.users.find().fetch().length == 0){
    user.roles = ['admin'];
  }
  return user;
});

process.env.MAIL_URL="smtp://omariiobleepbloop%40gmail.com:@smtp.gmail.com:465/"; 

Meteor.publish(null, function (){ 
  return Meteor.roles.find({});
});

Meteor.publish("items", function () {
  return Items.find();
});

Meteor.methods({
  newItem: function(item){
    var user = Meteor.user();
    if (!user || !user.roles) {
      throw new Meteor.Error(403, "Access denied");
    }
    Items.insert(item);
  },
  editItem: function(item, _id){
    var user = Meteor.user();
    if (!user || !user.roles) {
      throw new Meteor.Error(403, "Access denied");
    }
    Items.remove({_id: _id});
    Items.insert(item);
  },
  submitOrder: function(order) {
    Email.send({
      from: "omariiobleepbloop@gmail.com",
      to: "jamesshedel@gmail.com",
      subject: "Meteor Can Send Emails via Gmail",
      text: order,
    });
  },
});

