RTS.Commands.BuildSCV = function() {
  this.action = "build SCV";
  this.message = "Press 'S' to <span class='action'>" + this.action + "</span>";
  this.icon = "img/build-scv.svg";
  this.duration = 2000;
  this.span = false;
};

RTS.Commands.BuildSCV.prototype.execute = function() {
};
