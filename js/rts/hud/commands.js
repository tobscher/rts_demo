RTS.HUD.Commands = function(container) {
  this.container = container.find("#commands");
  this.grid = this.container.find(".grid");
};

RTS.HUD.Commands.prototype.set = function(commands) {
  this.grid.empty();

  var rowCount = 1;
  var row = $("<div></div>").addClass("row").addClass("row-1");

  for (var i = 0; i < commands.length; i++) {
    var command = commands[i];
    var newCommand = this.add(command);
    row.append(newCommand);
  }

  this.grid.append(row);
};

RTS.HUD.Commands.prototype.add = function(command) {
  var element = $("<div></div>").addClass("command").addClass(command.name);
  var image = $("<embed />").attr("src", command.icon);
  element.append(image);

  if (!command.span) {
    element.addClass("cell");
  } else {
    element.addClass("spanned-cell");
    var message = $("<div></div>").html(command.message);
    element.append(message);
  }

  return element;
};
