RTS.Map = function(options) {
  options = options || {};

  var map = new Vizi.Object();
  var clickCircle = new RTS.ClickCircle();
  var clickCircleScript = clickCircle.getComponent(RTS.ClickCircleScript);

  // Visual
  var geometry = new THREE.BoxGeometry(1000,1,1000);
  var floorTexture = new THREE.ImageUtils.loadTexture('img/ground.png');
  floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
  floorTexture.repeat.set( 25, 25 );
  var material = new THREE.MeshLambertMaterial( { map: floorTexture } );

  var visual = new Vizi.Visual({
    geometry: geometry,
    material: material
  });
  map.addComponent(visual);

  // Script
  var mapScript = new RTS.MapScript();
  map.addComponent(mapScript);

  var picker = new Vizi.Picker();
  map.addComponent(picker);

  picker.addEventListener("mousedown", function(event) {
    clickCircleScript.showAt(event.point);
  });

  map.addComponent(new RTS.EdgeScrollingScript({ camera: Vizi.Services.graphics.camera }));

  map.addChild(clickCircle);

  return map;
};

RTS.MapScript = function(options) {
  options = options || {};

  Vizi.Script.call(this, options);
}

// Scripts require inheritance script
inherits(RTS.MapScript, Vizi.Script);

RTS.MapScript.prototype.realize = function() {
}

RTS.MapScript.prototype.update = function() {
}
