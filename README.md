EmberFire
=========

[Ember.js](http://emberjs.com) and [Firebase](http://www.firebase.com) Integration

This library provides a base Ember.js model that does the retrieving and syncing of your object's property to your specific Firebase location.

## Installation

Just add the "emberfire.js" file in your html.

```html
<script type="text/javascript" src="./emberfire.js"></script>
```

## Example usage

Sample Firebase location data:

```
/myapp
  - person
    - firstName: "Juan"
    - lastName: "Pedro"
    - age: "17"
    - address: "Manila"
```

[Step 1] <br />
To have an Ember.js model that is Firebase-location-aware, you just have to extend the "EmberFire" model:

```javascript
Person = EmberFire.extend({});
```

[Step 2] <br />
Provide these properties to give default values:

 * `locationUrl` -- property to specify your firebase location.
 * `isList` -- (default is `false`) property to tell if the firebase location contains a list or not.
 * `modelProperties` -- property to enumerate the firebase location properties.

```javascript
var firebaseLocation = "/myapp";

Person = EmberFire.extend({
  locationUrl: firebaseLocation + "/person",
  modelProperties: ["firstName", "lastName", "age", "address"]
});
```

[Step 3] <br />
Once you are done specifying this configuration you can "optionally" add your own properties to your Ember.js model and specify their default values:

```javascript
Person = EmberFire.extend({
  locationUrl: firebaseLocation + "/person",
  isList: false,
  modelProperties: ["firstName", "lastName", "age", "address"]

  firstName: "",
  lastName: "",
  age: 0,
  address: ""
});
```

[Step 4] <br />
And then you can create an instance of your model and it will automatically sync any updates on your Ember.js model.

```javascript
window.App = Ember.Application.create();
App.person = Person.create();
```

If you want to delete the whole model on your Firebase location just call the "remove()" method.

```javascript
App.person.remove();
```
