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

  this.limit = 5;
  this.builds = [];
  this.current = null;
  this.building = false;
  this.clock = new THREE.Clock();

  this.hud = RTS.HUD.instance;
};

inherits(RTS.Abilities.TrainingScript, RTS.Abilities.Base);

RTS.Abilities.TrainingScript.prototype.realize = function() {
}

RTS.Abilities.TrainingScript.prototype.update = function() {
  // Get next build from queue
  if (this.current == null) {
    if (this.builds.length > 0) {
      this.next(this.builds[0]);
    }
  }

  if (!this.building) return;

  var elapsed = this.clock.getElapsedTime() * 1000.0;
  var percentCompleted = (elapsed / this.current.duration) * 100
  this.hud.buildQueue.update(percentCompleted);


  if (elapsed >= this.current.duration) {
    this.finish();
  }
};

RTS.Abilities.TrainingScript.prototype.push = function(build) {
  if (this.builds.length == this.limit) {
    // Queue is full
    return;
  }

  this.builds.push(build);
};

RTS.Abilities.TrainingScript.prototype.finish = function() {
  this.builds.shift();
  this.hud.buildQueue.update(0);

  this.current = null;
  this.building = false;

  this.clock.stop();
  this.clock.elapsedTime = 0.0;
};

RTS.Abilities.TrainingScript.prototype.next = function(build) {
  this.current = build;
  this.building = true;
  this.clock.start();
};
