RTS.ZoomScript = function(param)
{
  this.camera = param.camera;
  this.container = Vizi.Graphics.instance.container;

  this.fov = 40;
  this.zoomFactor = 1;
  this.zoomSpeed = 0.05;
  this.minZoomLevel = 0.2;
  this.maxZoomLevel = 1;
  this.updateZoom = false;

  var game = RTS.Game.instance;
  var folder = game.gui.addFolder('Zoom');
  folder.add(this, "minZoomLevel");
  folder.add(this, "maxZoomLevel");
  folder.add(this, "zoomFactor");
  folder.add(this, "zoomSpeed");

  Vizi.Script.call(this, param);
};

inherits(RTS.ZoomScript, Vizi.Script);

RTS.ZoomScript.prototype.realize = function() {
  var that = this;

  function MouseWheelHandler(e) {
    e.preventDefault();

    var delta = 0;

    if ( e.wheelDelta ) { // WebKit / Opera / Explorer 9
      delta = e.wheelDelta;
    } else if ( e.detail ) { // Firefox
      delta = - e.detail;
    }

    if (delta > 0) {
      that.zoomOut();
    } else {
      that.zoomIn();
    }
  }

  // IE9, Chrome, Safari, Opera
  this.container.addEventListener("mousewheel", MouseWheelHandler, false);

  // Firefox
  this.container.addEventListener("DOMMouseScroll", MouseWheelHandler, false);
};

RTS.ZoomScript.prototype.update = function() {
  if (this.updateZoom) {
    var newFov = this.fov * this.zoomFactor;

    if (newFov != this.camera.fov) {
      this.camera.fov = newFov;
      this.updateZoom = false;
    }
  }
};

RTS.ZoomScript.prototype.zoom = function(direction) {
  var newZoomFactor = this.zoomFactor + (this.zoomSpeed * direction);

  if (direction > 0) {
    // Zoom out
    this.zoomFactor = Math.min(newZoomFactor, this.maxZoomLevel);
  } else {
    // Zoom in
    this.zoomFactor = Math.max(newZoomFactor, this.minZoomLevel);
  }

  this.updateZoom = true;

  var boundaries = RTS.Services.Boundaries.instance;
  boundaries.boundariesNeedUpdating = true;
};

RTS.ZoomScript.prototype.zoomIn = function() {
  this.zoom(-1);
};

RTS.ZoomScript.prototype.zoomOut = function() {
  this.zoom(1);
};
