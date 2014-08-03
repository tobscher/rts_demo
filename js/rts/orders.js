RTS.Orders = function(options) {
  options = options || {};

  this.size = 200;

  var game = RTS.Game.instance;
  var orders = new Vizi.Object({layer: game.hudLayer});

  // Visual
  var geometry = new THREE.BoxGeometry(this.size,this.size,this.size);
  var material = new THREE.MeshBasicMaterial( { color: 0x0000ff });

  var visual = new Vizi.Visual({
    geometry: geometry,
    material: material
  });

  orders.addComponent(visual);

  return orders;
};
