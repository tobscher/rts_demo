RTS.Abilities.Training = function(options) {
  options = options || {};

  var object = new Vizi.Object();
  object.name = "training";

  var script = new RTS.Abilities.TrainingScript();
  object.addComponent(script);

  // Delegate to script
  object.push = function(build) {
    script.push(build);
  };

  return object;
};

RTS.Abilities.TrainingScript = function(options) {
  options = options || {};
  RTS.Abilities.Base.call(this, options);

  this.building = false;
  this.clock = new THREE.Clock();
};

inherits(RTS.Abilities.TrainingScript, RTS.Abilities.Base);

RTS.Abilities.TrainingScript.prototype.realize = function() {
}

RTS.Abilities.TrainingScript.prototype.update = function() {
  if (!this.building) return;

  var hud = RTS.HUD.instance;

  var elapsed = this.clock.getElapsedTime() * 1000.0;
  var percentCompleted = (elapsed / this.build.duration) * 100
  hud.buildQueue.update(percentCompleted);


  if (elapsed >= this.build.duration) {
    // Finished
    hud.buildQueue.update(0);
    this.build = null;
    this.building = false;
    this.clock.elapsedTime = 0.0;
    this.clock.stop();
  }
};

RTS.Abilities.TrainingScript.prototype.push = function(build) {
  this.build = build;
  this.building = true;
  this.clock.start();
};
