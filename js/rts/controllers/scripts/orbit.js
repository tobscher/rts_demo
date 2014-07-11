RTS.OrbitScript = function(param)
{
  this.camera = param.camera;

	Vizi.Script.call(this, param);

	this.radius = param.radius || Vizi.ModelControllerScript.default_radius;
	this.minRadius = param.minRadius || Vizi.ModelControllerScript.default_min_radius;
	this.minAngle = (param.minAngle !== undefined) ? param.minAngle : 
		Vizi.ModelControllerScript.default_min_angle;
	this.maxAngle = (param.maxAngle !== undefined) ? param.maxAngle : 
		Vizi.ModelControllerScript.default_max_angle;
	this.minDistance = (param.minDistance !== undefined) ? param.minDistance : 20;
	this.maxDistance = (param.maxDistance !== undefined) ? param.maxDistance : 200;
	this.allowPan = (param.allowPan !== undefined) ? param.allowPan : true;
	this.allowZoom = (param.allowZoom !== undefined) ? param.allowZoom : true;
	this.allowRotate = (param.allowRotate !== undefined) ? param.allowRotate : true;
}

goog.inherits(RTS.OrbitScript, Vizi.Script);

RTS.OrbitScript.prototype.realize = function() {
	this.controls = this.createControls(this.camera);
}

RTS.OrbitScript.prototype.createControls = function(camera)
{
	var controls = new Vizi.OrbitControls(camera.object, Vizi.Graphics.instance.container);
	controls.userMinZoom = this.minZoom;
	controls.userMaxZoom = this.maxZoom;
	controls.minPolarAngle = this.minAngle;
	controls.maxPolarAngle = this.maxAngle;	
	controls.minDistance = this.minDistance;
	controls.maxDistance = this.maxDistance;
	controls.userPan = false;
	controls.userZoom = true;
	controls.userZoomSpeed = 0.5;
	controls.userRotate = false;
	controls.enabled = true;
	return controls;
}

RTS.OrbitScript.prototype.update = function()
{
  this.controls.update();
}
