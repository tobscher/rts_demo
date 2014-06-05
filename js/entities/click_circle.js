var ClickCircle = GameObject.extend({
  init: function(game) {
    this._super(game);

    this.animating = false;
    this.animationStep = 0;

    this.entity = this.build();
    game.scene.add(this.entity);
    game.tree.push(this);
  },

  build: function() {
    var radius   = 4,
        segments = 32,
        material = new THREE.LineBasicMaterial( { color: 0x00ff00 } ),
        geometry = new THREE.CircleGeometry( radius, segments );

    // Remove center vertex
    geometry.vertices.shift();

    var line = new THREE.Line( geometry, material )
    line.rotation.x = Math.PI / 2;
    line.position.y = 0.6;
    line.material.visible = false;

    return line;
  },

  onUpdate: function(delta) {
    this._super(delta);

    this.animationStep += 0.04;
    this.entity.scale.sub(new THREE.Vector3(0.01, 0.01, 0.01));

    if (this.animationStep >= 1) {
      this.animating = false;
      this.animationStep = 0;
      this.entity.material.visible = false;
    }
  },

  show: function(position) {
    this.entity.position.set(position.x, this.entity.position.y, position.z);
    this.entity.material.visible = true;

    this.animationStep = 0;
    this.entity.scale.set(0.3, 0.3, 0.3);
    this.animating = true;
  }
});
