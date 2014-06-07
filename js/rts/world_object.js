var WorldObject = GameObject.extend({
  init: function(game, name) {
    this._super(game, name);

    this.entity = this.build();
    game.scene.add(this.entity);

    this.selected = false;
    this.calculcateBounds();
  },

  onUpdate: function(delta) {
    this._super(delta);
  },

  onClick: function() {
    game.hud.orders.setTitle(this.name);
    this.select();
  },

  select: function() {
    if (this.game.currentlySelected != null) {
      this.game.currentlySelected.selected = false;
    }
    this.selected = true;
    this.game.selection.entity.material.visible = true;

    var max = Math.max(this.box.size().x, this.box.size().z) * 0.75;

    this.game.selection.entity.scale.x = max;
    this.game.selection.entity.scale.y = max;
    this.game.selection.entity.scale.z = max;

    this.game.currentlySelected = this;

    this.entity.add(this.game.selection.entity);
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

  calculcateBounds: function() {
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
