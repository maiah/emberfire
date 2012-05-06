emberfire
=========

Emberjs and Firebase Integration

This library provides a base Emberjs model that does the retrieving and syncing of your object's property to your specific Firebase location.
This is just the initial implementation and only provides read and update. No removal for now but it will come next. 

Just add the emberfire.js file in your html.

<script type="text/javascript" src="./emberfire.js"></script>

Example usage
==============

[app.js]

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
