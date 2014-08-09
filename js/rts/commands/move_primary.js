RTS.Commands.PrimaryMove = function() {
  this.action = "move";
  this.message = "Right-click to <span class='action'>" + this.action + "</span>";
  this.icon = "img/move-primary.svg";
  this.span = true;
};

RTS.Commands.PrimaryMove.prototype.execute = function() {

};
