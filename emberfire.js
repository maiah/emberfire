FirebaseServer = "http://gamma.firebase.com";

EmberFire = Ember.Object.extend({
  locationUrl: "/",
  isList: false,
  modelProperties: [],

  firebaseLocation: null,

  initialize: function() {
    this.firebaseLocation = new Firebase(FirebaseServer + this.locationUrl);
    var props = this.modelProperties;
    var readEvent = this.isList ? "child_added" : "value";
    var instance = this;

    // Get the firebase object then set the values
    this.firebaseLocation.on("value", function(snapshot) {
      var val = snapshot.val();
      if (val !== null) {

        for (var i = 0; i < props.length; i++) {
          var prop = props[i],
            valueToSet = val[prop];
          values = {};
          values[prop] = valueToSet;
          instance.reopen(values);
        }
      }
    });

    // Add observers on the emberjs object properties
    for (var i = 0; i < props.length; i++) {
      var prop = props[i];
      this.addObserver(prop, function() {
        var values = {};
        for (var j = 0; j < props.length; j++) {
          var p = props[j];
          values[p] = instance.get(p);
        }
        instance.firebaseLocation.set(values);
      });
    }
  },

  remove: function() {
    console.log("Remove operation not yet supported.");
  }

});
