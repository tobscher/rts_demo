THREE.Quaternion.prototype.eulerAngle = function() {
  var euler = new THREE.Euler();
  euler.setFromQuaternion(this);

  return euler;
}
