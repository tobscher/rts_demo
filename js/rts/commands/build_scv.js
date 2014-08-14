RTS.Commands.BuildSCV = function(commandCentre) {
  this.action = "build SCV";
  this.message = "Press 'S' to <span class='action'>" + this.action + "</span>";
  this.icon = "img/build-scv.svg";
  this.duration = 5000;
  this.span = false;
  this.commandCentre = commandCentre;
};

RTS.Commands.BuildSCV.prototype.execute = function() {
  var build = {
    type: RTS.Units.SCV,
    duration: this.duration,
    icon: this.icon
  };

  this.commandCentre.train(build);
};
