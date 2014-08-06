RTS.Fullscreen = function(element) {
  this.element = element;
};

RTS.Fullscreen.prototype.request = function() {
  var gui = require('nw.gui');
  gui.Window.get().enterKioskMode();
  gui.Window.get().enterKioskMode();
};

RTS.Fullscreen.prototype.release = function() {
};
