$(function() {
window.App = Ember.Application.create();
var firebaseLocation = "/myapp";

Person = EmberFire.extend({
  locationUrl: firebaseLocation + "/person",
  isList: false,
  modelProperties: ["firstName", "lastName", "age", "address"],

  firstName: "",
  lastName: "",
  age: 0,
  address: ""
});

App.person = Person.create();
App.person.initialize();

App.person.set("firstName", "Maiah");

User = EmberFire.extend({
  locationUrl: firebaseLocation + "/users/maiah",
  isList: false,
  modelProperties: ["name", "groups"],

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
