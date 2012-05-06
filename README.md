emberfire
=========

Emberjs and Firebase Integration

This library provides a base Emberjs model that does the retrieving and syncing of your object's property to your specific Firebase location.
This is just the initial implementation and only provides read and update. No removal for now but it will come next.

Just add the emberfire.js file in your html.

<script type="text/javascript" src="./emberfire.js"></script>

Example usage:

[index.html]

<html>
<head>
  <title>EmberFire App</title>

</head>
<body>
<script type="text/x-handlebars">
  <div>{{App.person.firstName}} {{App.person.lastName}}</div>
</script>

<script type="text/javascript" src="./firebase-v0-20120430.js"></script>
<script type="text/javascript" src="./jquery.min-1.7.1.js"></script>
<script type="text/javascript" src="./ember-0.9.7.1.min.js"></script>
<script type="text/javascript" src="./emberfire.js"></script>
<script type="text/javascript" src="./app.js"></script>

</body>
</html>

And in you app.js file:

[app.js]

$(function() {
window.App = Ember.Application.create();
var firebaseLocation = "/your_root_location_here";

var personConf = {
    locationUrl: firebaseLocation + "/person",
    isList: false
}

Person = EmberFire.extend({
  emberFireConf: personConf,

  firstName: "",
  lastName: "",
  age: 0,
  address: ""
});

App.person = Person.create();
App.person.initialize();

});
