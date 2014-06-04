var Float = {};

Float.compare = function(a, b, threshold) {
  if (typeof threshold == 'undefined') threshold = 0.00001;

  return (Math.abs(a - b) < threshold);
}
