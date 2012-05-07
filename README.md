EmberFire
=========

Emberjs and Firebase Integration

This library provides a base Emberjs model that does the retrieving and syncing of your object's property to your specific Firebase location.
This is just the initial implementation and only provides read and update. No removal for now but it will come next. 

Just add the "emberfire.js" file in your html.

Example usage
==============

Sample Firebase location data:

/myapp <br />
&nbsp;&nbsp;&nbsp;&nbsp; - person <br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - firstName: "Juan" <br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - lastName: "Pedro" <br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - age: "17" <br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - address: "Manila" <br />

[Step 1] <br />
To have an Emberjs model that is Firebase-location-aware, you just have to extend the EmberFire model:

```javascript
Person = EmberFire.extend({});
```

[Step 2] <br />
And override "emberFireConf" property to provide your firebase location through "locationUrl" property and the "isList" property to tell if location contains a list or not.

```javascript
var firebaseLocation = "/myapp";
var personConf = {
  locationUrl: firebaseLocation + "/person",
  isList: false
};

Person = EmberFire.extend({
  emberFireConf: personConf
});
```

[Step 3] <br />
Once you are done specifying this configuration you can add your own properties to your Emberjs model:

```javascript
Person = EmberFire.extend({
  emberFireConf: personConf,

  firstName: "",
  lastName: "",
  age: "",
  address: ""
});
```

[Step 4] <br />
And then you can create an instance of your model and call the "initialize" method to get its value based on the Firebase location you specified and it will automatically sync any updates on your Emberjs model.

```javascript
window.App = Ember.Application.create();

App.person = Person.create();
App.person.initialize();
```
