RTS.HUD.Commands = function(container) {
  this.container = container.find("#commands");
  this.grid = this.container.find(".grid");
};

RTS.HUD.Commands.prototype.set = function(commands) {
  this.grid.empty();

  for (var i = 0; i < commands.length; i++) {
    var command = commands[i];
    this.add(command);
  }
};

RTS.HUD.Commands.prototype.add = function(command) {
  var element = $("<div></div>").addClass("command").addClass(command.name);
  var message = $("<div></div>").html(command.message);
  var image = $("<img>").attr("src", command.icon);
  element.append(image);
  element.append(message);

  this.grid.append(element);
};
