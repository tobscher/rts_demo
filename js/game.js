function Game(scene, camera) {
  this.scene = scene;
  this.mainCamera = camera;

  this.tree = [];
}

Game.prototype.add = function(klass, options) {
  this.tree.push(new klass(this));
}

Game.prototype.update = function(delta) {
  for (var i = 0; i < this.tree.length; i++) {
    this.tree[i].onUpdate(delta);
  }
}
