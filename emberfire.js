FirebaseServer = "http://gamma.firebase.com";

EmberFire = Ember.Object.extend({
  // Properties to override
  locationUrl: "/",
  isListItem: false,
  listId: "",
  modelProperties: [],

  // Internal properties
  firebaseLocation: null,
  parentFirebaseLocation: null,
  defaultValues: {},
  isRemoved: false,

  init: function() {
    this._super();
    _init(this);    
  },

  save: function() {
    _save(this);
  },

  remove: function() {
    _remove(this);
  }

});

var _init = function(model) {
  var props = model.modelProperties;

  // Store default values
  for (var i = 0; i < props.length; i++) {
    var prop = props[i];
    model.defaultValues[prop] = model.get(prop);
  }

  // Instantiate Firebase location
  model.firebaseLocation = new Firebase(FirebaseServer + model.locationUrl);
  if (model.isListItem) {
    model.parentFirebaseLocation = model.firebaseLocation;
    createChildFirebaseLocation(model);
  }

  bindEmberModelToFirebaseLocation(model);
};

/* Re-syncs the Ember.js model to its Firebase location or creates new Firebase object if the
 * model is an item from collection.
 */
var _save = function(model) {
  if (model.isRemoved && model.isListItem) {
    model.isRemoved = false;
    createChildFirebaseLocation(model);
    bindEmberModelToFirebaseLocation(model);

  } else if (model.isRemoved) {
    model.isRemoved = false;
    syncValues(model);
  }
};

/* Fires "remove" operation to its Firebase location and removes the syncronization of Ember.js
 * model from its Firebase location
 */
var _remove = function(model) {
  model.firebaseLocation.remove(function(success) {
    if (success) {
      model.isRemoved = true;
      model.listId = "";
      resetToDefaultValues(model);

    } else {
      console.log("Removal failed.");
    }
  });
};

// Creates child Firebase location for list item.
var createChildFirebaseLocation = function(model) {
  if (model.listId !== "") {
    model.firebaseLocation = model.parentFirebaseLocation.child(model.listId);
  } else {
    var values = retrieveValues(model);
    model.firebaseLocation = model.parentFirebaseLocation.push(values);
    model.listId = model.firebaseLocation.name();
  }
};

// Syncs the Ember.js model properties to its Firebase location.
var syncValues = function(model) {
  var values = retrieveValues(model);
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

var retrieveValues = function(model) {
  var values = {};
  for (var j = 0; j < model.modelProperties.length; j++) {
    var p = model.modelProperties[j];
    values[p] = model.get(p);
  }
  return values;
};

var bindEmberModelToFirebaseLocation = function(model) {
  var props = model.modelProperties;

  // Get the firebase object then set the values
  model.firebaseLocation.on("value", function(snapshot) {
    var val = snapshot.val();
    if (val !== null) {
      for (var i = 0; i < props.length; i++) {
        var prop = props[i],
          valueToSet = val[prop],
          values = {};
        values[prop] = valueToSet;
        model.set(prop, valueToSet);
      }
    }
  });

  // Add observers on the Ember.js object properties
  for (var i = 0; i < props.length; i++) {
    var prop = props[i];
    model.addObserver(prop, function() {
      if (!model.isRemoved) {
        syncValues(model);
      }
    });
  }

  // Add event handler when "remove" event is triggered by Firebase
  model.firebaseLocation.on("child_removed", function(oldChildSnapshot) {
    model.isRemoved = true;
    resetToDefaultValues(model);
  });
};
