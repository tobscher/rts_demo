RTS.HUD.BuildQueue = function(container) {
  this.container = container.find("#build_queue");
  this.percentMeter = this.container.find(".build_queue-current-progress-meter");
  this.queue = [];
};

RTS.HUD.BuildQueue.prototype.push = function(build) {
  this.queue.push();
};

RTS.HUD.BuildQueue.prototype.pop = function() {
  if (this.queue.length == 0) return;

  this.queue.shift();
};

RTS.HUD.BuildQueue.prototype.cancel = function() {
  if (this.queue.length == 0) return;

  this.queue.pop();
};

RTS.HUD.BuildQueue.prototype.update = function(percent) {
  this.percentMeter.css('width', percent + "%");
};
