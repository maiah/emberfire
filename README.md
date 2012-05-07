EmberFire
=========

Emberjs and Firebase Integration

This library provides a base Emberjs model that does the retrieving and syncing of your object's property to your specific Firebase location.
This is just the initial implementation and only provides read and update. No removal for now but it will come next. 

Just add the "emberfire.js" file in your html.

Example usage
==============

To have an Emberjs model that is Firebase-location-aware, you just have to extend the EmberFire model:

Person = EmberFire.extend({});

And override "emberFireConf" property to provide your firebase location through "locationUrl" property and the "isList" property to tell if location contains a list or not.

var firebaseLocation = "/myapp";<br />
var personConf = { <br />
&nbsp;&nbsp;locationUrl: firebaseLocation + "/person", <br />
&nbsp;&nbsp;isList: false <br />
}; <br /><br />
Person = EmberFire.extend({ <br />
&nbsp;&nbsp;emberFireConf: personConf <br />
});

Once you are done specifying this configuration you can add your own properties on your Emberjs model:

Person = EmberFire.extend({ <br />
&nbsp;&nbsp;emberFireConf: personConf, <br />
<br />
&nbsp;&nbsp;firstName: "",
&nbsp;&nbsp;lastName: "",
&nbsp;&nbsp;age: "",
&nbsp;&nbsp;address: "",
});

And then you can create an instance of you model and call the "initialize" method to get its value based on the Firebase location you specified and it will automatically sync any updates on your Emberjs model.

window.App = Ember.Application.create();
App.person = Person.create();
App.person.initialize();
