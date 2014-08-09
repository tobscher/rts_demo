RTS.Minimap.WorldObject = function(player, options) {
  options = options || {};

  var minimap = RTS.Minimap.instance;
  var color = player.colour;
  var height = 1;

  var me = RTS.HumanPlayer.instance;
  if (player.id == me.id) {
    color = 0x00ff00;
    height = 3;
  }

  var mini = new Vizi.Object({layer: minimap.layer});
  mini.name = options.name + " (Minimap)";
  mini.sight = options.sight;

  var geometry = new THREE.BoxGeometry(options.width, height, options.depth);
  var material = new THREE.MeshBasicMaterial({ color: color});
  var visual = new Vizi.Visual({
    geometry: geometry,
    material: material
  });

  mini.addComponent(visual);

  return mini;
};
