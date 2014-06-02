var WorldObject = GameObject.extend({
  init: function(game, name) {
    this._super(game);

    this.name = name;
    this.selected = false;
  },

  onUpdate: function(delta) {
    this._super(delta);
  },

  onClick: function() {
    game.hud.orders.setTitle(this.name);
  }
});
