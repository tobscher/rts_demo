RTS.Cursor = function() {
  this.$element = $("body");
  this.element = this.$element[0];
  this.currentCursor = "cursor";

  RTS.Cursor.instance = this;
};

RTS.Cursor.prototype.set = function(cursorName) {
  if (this.currentCursor == cursorName) return;

  this.$element.removeClass();
  this.$element.addClass(cursorName);

  this.currentCursor = cursorName;
};
