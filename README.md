EmberFire
=========

Emberjs and Firebase Integration

This library provides a base Emberjs model that does the retrieving and syncing of your object's property to your specific Firebase location.
This is just the initial implementation and only provides create, read, and update. No removal for now but it will come next.

## Installation

Just add the "emberfire.js" file in your html.

```html
<script type="text/javascript" src="./emberfire.js"></script>
```

## Example usage

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
Provide these properties to give default values:

 * `locationUrl` -- property to specify you firebase location.
 * `isList` -- property to tell if location contains a list or not.
 * `modelProperties` -- property to specify the firebase location properties.

```javascript
var firebaseLocation = "/myapp";

Person = EmberFire.extend({
  locationUrl: firebaseLocation + "/person",
  isList: false,
  modelProperties: ["firstName", "lastName", "age", "address"]
});
```

[Step 3] <br />
Once you are done specifying this configuration you can "optionally" add your own properties to your Emberjs model and specify their default values:

```javascript
Person = EmberFire.extend({
  locationUrl: firebaseLocation + "/person",
  isList: false,
  modelProperties: ["firstName", "lastName", "age", "address"]

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