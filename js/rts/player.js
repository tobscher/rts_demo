var Player = GameObject.extend({
  init: function(game) {
    this._super(game, "Player");

    this.currentlySelected = null;

    this.addBehaviour(Selection);
    this.addBehaviour(UserInput);
  },

  select: function(object) {
    var selection = this.getBehaviour(Selection);
    selection.entity.material.visible = true;

    var max = Math.max(object.box.size().x, object.box.size().z) * 0.75;
    selection.entity.scale.x = max;
    selection.entity.scale.y = max;
    selection.entity.scale.z = max;
  }
});
