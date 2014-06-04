function Game(scene, camera, gui) {
  this.scene = scene;
  this.mainCamera = camera;
  this.gui = gui;
  this.hud = new HUD();
  this.selection = new Selection(this);
  this.selection.entity.material.visible = false;
  this.scene.add(this.selection);

  this.tree = [];
  this.objectMap = {};

  this.currentlySelected = null;
}

Game.prototype.add = function(klass, options) {
  var gameObject = new klass(this);
  this.tree.push(gameObject);

  if (typeof(gameObject.entity) != 'undefined') {
    this.objectMap[gameObject.entity.id] = gameObject;

    if (gameObject.entity.children.length > 0) {
      for (var i = 0; i < gameObject.entity.children.length; i++) {
        this.objectMap[gameObject.entity.children[i].id] = gameObject;
      }
    }
  }
}

Game.prototype.update = function(delta) {
  for (var i = 0; i < this.tree.length; i++) {
    this.tree[i].onUpdate(delta);
  }
}

Game.prototype.findByObjectId = function(objectId) {
  return this.objectMap[objectId];
}

Game.prototype.objects = function() {
  var list = [];
  for(var key in this.objectMap) {
    list.push(this.objectMap[key].entity);
  }

  return list;
}
