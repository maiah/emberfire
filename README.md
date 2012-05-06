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

var firebaseLocation = "/your_root_location_here";<br />
var personConf = { locationUrl: firebaseLocation + "/person", isList: false }; <br />
Person = EmberFire.extend({ emberFireConf: personConf });

Once you are done specifying this configuration you can add your own properties and the EmberFire will automatically sync your Emberjs model to its Firebase location.
