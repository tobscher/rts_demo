var WorldObject = GameObject.extend({
  init: function(game, name) {
    this._super(game, name);

    if (typeof this.build != 'undefined') {
      this.entity = this.build();
      game.scene.add(this.entity);
      this.calculateBounds();
    } else {
      this.preload();
    }

    this.selected = false;
  },

  onUpdate: function(delta) {
    this._super(delta);
  },

  onClick: function() {
    game.hud.orders.setTitle(this.name);
    this.select();
  },

  select: function() {
    if (this.game.player.currentlySelected != null) {
      this.game.player.currentlySelected.selected = false;
    }
    this.selected = true;
    this.game.player.select(this);


    this.game.player.currentlySelected = this;
    this.entity.add(this.game.player.getBehaviour(Selection).entity);
  },

  toggle: function(visible) {
    this.selection.entity.material.visible = visible;
  },

  hide: function() {
    this.toggle(false);
  },

  show: function() {
    this.toggle(true);
  },

  calculateBounds: function() {
    if (typeof this.entity.geometry == 'undefined') {
      var box = new THREE.Box3();
    } else {
      this.entity.geometry.computeBoundingBox();
      var box = this.entity.geometry.boundingBox.clone();
    }

    this.entity.traverse(function (child) {
      if (child instanceof THREE.Mesh) {
        child.geometry.computeBoundingBox();

        var childbox = child.geometry.boundingBox.clone();
        childbox.translate(child.localToWorld(new THREE.Vector3()));
        box.union( childbox );
      }
    });

    this.box = box;
  }
});