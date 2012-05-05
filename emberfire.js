FirebaseServer = "http://gamma.firebase.com";

EmberFire = Ember.Object.extend({
  locationUrl: "/",

  firebaseLocation: function() {
    return new Firebase(FirebaseServer + this.locationUrl);
  },

  initialize: function() {
    console.log("Initializing");
    var instance = this;
    instance.firebaseLocation().once("value", function(snapshot) {
      var val = snapshot.val();
      for (var prop in val) {
        instance.set(prop, val[prop]);
      }
    });
  }
});
