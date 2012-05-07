$(function() {
window.App = Ember.Application.create();
var firebaseLocation = "/your_root_location_here";

Person = EmberFire.extend({
  emberFireConf: {
    locationUrl: firebaseLocation + "/person",
    isList: false
  },

  firstName: "",
  lastName: "",
  age: 0,
  address: ""
});

App.person = Person.create();
App.person.initialize();

var userConf = {
    locationUrl: firebaseLocation + "/users/maiah",
    isList: false
};

User = EmberFire.extend({
  emberFireConf: userConf,

  name: {
    first: "",
    last: "",
  },
  groups: [{
    "id" : {name: ""}
  }]
});

App.user = User.create();
App.user.initialize();

});
