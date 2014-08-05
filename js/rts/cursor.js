RTS.Cursor = function() {
  this.element = document.createElement('div');
  this.element.setAttribute("id", "cursor");
  this.state = "default";

  $(this.element).addClass("default");

  $("#container").append(this.element);

  RTS.Cursor.instance = this;
};

RTS.Cursor.prototype.update = function(position) {
  var d = this.element;
  d.style.left = position.x + "px";
  d.style.top = position.y + "px";
};
