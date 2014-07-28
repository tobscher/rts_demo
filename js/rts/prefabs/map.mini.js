RTS.MapMini = function(options) {
  options = options || {};

  this.size = 1000;

  var graphics = Vizi.Graphics.instance;
  var map = new Vizi.Object({layer: graphics.mapLayer});

  // Visual
  var geometry = new THREE.BoxGeometry(this.size,1,this.size);
  var floorTexture = new THREE.ImageUtils.loadTexture('/img/ground2.jpg');
  floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
  floorTexture.repeat.set( 25, 25 );
  var material = new THREE.MeshLambertMaterial( { map: floorTexture } );

  var visual = new Vizi.Visual({
    geometry: geometry,
    material: material
  });

  map.addComponent(visual);

  return map;
};
