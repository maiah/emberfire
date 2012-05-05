$(function() {
window.App = Ember.Application.create();
var firebaseLocation = "/xxxxx";

Person = EmberFire.extend({
  locationUrl: firebaseLocation + "/person",
  firstName: "",
  lastName: "",
  age: 0,
  address: ""
});

App.person = Person.create();
App.person.initialize();

});
