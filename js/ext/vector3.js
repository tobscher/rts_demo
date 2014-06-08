THREE.Vector3.MoveTowards = function(current, target, maxDistanceDelta) {
  var start = current.clone();
  var end = start.clone();
  var direction = target.clone().sub(start).normalize();

  var stepX = direction.x * maxDistanceDelta;
  var stepY = direction.y * maxDistanceDelta;
  var stepZ = direction.z * maxDistanceDelta;

  var funcX = stepX < 0 ? Math.max : Math.min;
  var funcY = stepY < 0 ? Math.max : Math.min;
  var funcZ = stepZ < 0 ? Math.max : Math.min;

  end.x = funcX(start.x + stepX, target.x);
  end.y = funcY(start.y + stepY, target.y);
  end.z = funcZ(start.z + stepZ, target.z);

  return end;
};
