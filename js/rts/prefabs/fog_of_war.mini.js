RTS.FogOfWarMini = function(options) {
  options = options || {};

  this.size = 1024;

  var game = RTS.Game.instance;
  var fogOfWar = new Vizi.Object({layer: game.mapLayer});

  var geometry = new THREE.PlaneGeometry(this.size,this.size);
  var material = new THREE.MeshBasicMaterial({
    color: 0x000000,
    alphaMap: RTS.FogOfWarMini.getTexture(),
    transparent: true
  });

  var mesh = new THREE.Mesh(geometry, material);
  mesh.position.y = 5;
  mesh.rotation.x = -Math.PI/2;

  var visual = new Vizi.Visual({
    object: mesh,
    geometry: geometry,
    material: material
  });

  fogOfWar.addComponent(visual);

  return fogOfWar;
};

RTS.FogOfWarMini.getTexture = function() {
  if (this.texture) {
    return this.texture;
  }

  this.canvasExplored = document.createElement('canvas');
  this.canvas = document.createElement('canvas');
  this.ctx = this.canvas.getContext('2d');
  this.ctxExplored = this.canvasExplored.getContext('2d');

  this.ctx.canvas.width = 1024;
  this.ctx.canvas.height = 1024;
  this.ctxExplored.canvas.width = 1024;
  this.ctxExplored.canvas.height = 1024;

  this.ctx.fillStyle = "rgb(200,200,200)";
  this.ctx.fillRect(0,0,this.ctx.canvas.width,this.ctx.canvas.height);

  this.texture = new THREE.Texture(this.ctx.canvas);
  this.texture.needsUpdate = true;
  return this.texture;
};

RTS.FogOfWarMini.drawCircle = function(vector) {
  var game = RTS.Game.instance;
  var size = 1024;
  var offset = size / 2;

  var translated = { x: (vector.x + offset),
                     y: (vector.z + offset)
  };

  this.ctxExplored.beginPath();
  this.ctxExplored.fillStyle = 'rgb(128,128,128)';
  this.ctxExplored.arc(translated.x, translated.y, 50, 0, 2*Math.PI);
  this.ctxExplored.fill();

  // this.ctx.globalCompositeOperation = "xor";
  this.ctx.fillStyle = "rgb(200,200,200)";
  this.ctx.fillRect(0,0,this.ctx.canvas.width,this.ctx.canvas.height);

  this.ctx.drawImage(this.ctxExplored.canvas,0,0);

  for (var i = 0; i < RTS.HumanPlayer.instance.worldObjects.length; i++) {
    var object = RTS.HumanPlayer.instance.worldObjects[i];
    this.ctx.beginPath();
    this.ctx.fillStyle = 'rgb(0,0,0)';
    this.ctx.arc(object.x + offset, object.z + offset, 50, 0, 2*Math.PI);
    this.ctx.fill();
  }

  this.texture.needsUpdate = true;
};
