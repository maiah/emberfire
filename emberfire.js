FirebaseServer = "http://gamma.firebase.com";

EmberFire = Ember.Object.extend({
  locationUrl: "/",
  isList: false,
  modelProperties: [],

  firebaseLocation: null,
  defaultValues: {},
  isRemoved: false,

  init: function() {
    this._super();

    this.firebaseLocation = new Firebase(FirebaseServer + this.locationUrl);
    var props = this.modelProperties,
      readEvent = this.isList ? "child_added" : "value",
      instance = this;

    // Store default values
    for (var i = 0; i < props.length; i++) {
      var prop = props[i];
      this.defaultValues[prop] = this.get(prop);
    }

    // Get the firebase object then set the values
    this.firebaseLocation.on(readEvent, function(snapshot) {
      var val = snapshot.val();
      if (val !== null) {

        for (var i = 0; i < props.length; i++) {
          var prop = props[i],
            valueToSet = val[prop],
            values = {};
          values[prop] = valueToSet;
          instance.set(prop, valueToSet);
        }
      }
    });

    // Add observers on the Ember.js object properties
    for (var i = 0; i < props.length; i++) {
      var prop = props[i];
      this.addObserver(prop, function() {
        if (!instance.isRemoved) {
          syncValues(instance);
        }
      });
    }

    // Add event handler when "remove" event is triggered by Firebase
    this.firebaseLocation.on("child_removed", function(oldChildSnapshot) {
      if (this.isList) {
        // TODO!
      } else {
        console.log(oldChildSnapshot);
        instance.isRemoved = true;
        resetToDefaultValues(instance);
      }
    });
  },

  // Re-syncs the Ember.js model to its Firebase location
  save: function() {
    this.isRemoved = false;
    syncValues(this);
  },

  /* Fires "remove" operation to its Firebase location and removes the syncronization of Ember.js
   * model from its Firebase location
   */
  remove: function() {
    var instance = this,
      props = this.modelProperties;

    this.firebaseLocation.remove(function(success) {
      if (success) {
        instance.isRemoved = true;
        resetToDefaultValues(instance);

      } else {
        console.log("Removal failed.");
      }
    });
  }

});

// Syncs the Ember.js model properties to its Firebase location.
var syncValues = function(model) {
  var values = {};
  for (var j = 0; j < model.modelProperties.length; j++) {
    var p = model.modelProperties[j];
    values[p] = model.get(p);
  }
  model.firebaseLocation.set(values);
};

// Resets the Ember.js model to default values
var resetToDefaultValues = function(model) {
  var props = model.modelProperties;
  for (var i = 0; i < props.length; i++) {
    var prop = props[i];
    model.set(prop, model.defaultValues[prop]);
  }
};
