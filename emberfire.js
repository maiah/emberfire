FirebaseServer = "http://gamma.firebase.com";

EmberFire = Ember.Object.extend({
  emberFireConf: {
    locationUrl: "/",
    isList: false
  },

  firebaseLocation: function() {
    return new Firebase(FirebaseServer + this.emberFireConf.locationUrl);
  },

  initialize: function() {
    var readEvent = this.emberFireConf.isList ? "child_added" : "value";

    // Get the firebase object
    var instance = this;
    this.firebaseLocation().on("value", function(snapshot) {
      var props = {};
      var val = snapshot.val();
      for (var prop in val) {
        instance.set(prop, val[prop]);
        props[prop] = "";
      }

      // Add observers on the emberjs object
      for (var prop in props) {
        instance.addObserver(prop, function() {
          var values = {};
          for (var p in props) {
            values[p] = instance.get(p);
          }
          instance.firebaseLocation().set(values);
        });
      }
    });
  }

});
