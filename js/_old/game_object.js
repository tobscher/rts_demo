var GameObject = Class.extend({
  init: function(game, name) {
    this.game = game;
    this.name = name;

    this.behaviours = [];
  },

  onUpdate: function(delta) {
    for (var i = 0; i < this.behaviours.length; i++) {
      this.behaviours[i].onUpdate(delta);
    }
  },

  addBehaviour: function(klass) {
    var instance = new klass(this.game);
    this.behaviours.push(instance);
  },

  getBehaviour: function(type) {
    for (var i = 0; i < this.behaviours.length; i++) {
      var behaviour = this.behaviours[i];

      if (behaviour instanceof type) {
        return behaviour;
      }
    }

    return null;
  }
});
