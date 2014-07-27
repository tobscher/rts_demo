RTS.ZoomScript = function(param)
{
  this.camera = param.camera;
  this.container = Vizi.Graphics.instance.container;

  this.fov = 40;
  this.zoomFactor = 1;
  this.zoomSpeed = 0.05;
  this.minZoomLevel = 0.5;
  this.maxZoomLevel = 1;
  this.updateZoom = false;

  Vizi.Script.call(this, param);
}

goog.inherits(RTS.ZoomScript, Vizi.Script);

RTS.ZoomScript.prototype.realize = function() {
  var that = this;

  function MouseWheelHandler(e) {
    e.preventDefault();

    var delta = 0;

    if ( event.wheelDelta ) { // WebKit / Opera / Explorer 9
      delta = event.wheelDelta;
    } else if ( event.detail ) { // Firefox
      delta = - event.detail;
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
};

RTS.ZoomScript.prototype.zoomIn = function() {
  this.zoom(-1);
};

RTS.ZoomScript.prototype.zoomOut = function() {
  this.zoom(1);
};
