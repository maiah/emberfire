$(function() {
window.App = Ember.Application.create();
var firebaseLocation = "/teemail";

Person = EmberFire.extend({
  locationUrl: firebaseLocation + "/person",
  modelProperties: ["firstName", "lastName", "age", "address"],

  firstName: "",
  lastName: "",
  age: 0,
  address: ""
});

//App.person = Person.create();

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

//App.user = User.create();
//App.user.initialize();

Soldier = EmberFire.extend({
  locationUrl: firebaseLocation + "/soldiers",
  isListItem: true,
  modelProperties: ["name", "type", "rank"],

  name: "",
  type: "",
  rank: ""
});

App.maco = Soldier.create({
  listId: "-ISOZB4BY9QWkj-tqE3a",
  name: "Maco"
});

});
