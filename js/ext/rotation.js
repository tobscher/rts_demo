function CalcShortestRot(from, to)
{
    // If from or to is a negative, we have to recalculate them.
    // For an example, if from = -45 then from(-45) + 360 = 315.
    if(from < 0) {
       from += 360;
    }

    if(to < 0) {
       to += 360;
    }

    // Do not rotate if from == to.
    if(from == to ||
       from == 0  && to == 360 ||
       from == 360 && to == 0)
    {
       return 0;
    }

    // Pre-calculate left and right.
    var left = (360 - from) + to;
    var right = from - to;

    // If from < to, re-calculate left and right.
    if(from < to)  {
       if(to > 0) {
         left = to - from;
         right = (360 - to) + from;
       } else {
         left = (360 - to) + from;
         right = to - from;
       }
    }

    // Determine the shortest direction.
    return ((left <= right) ? left : (right * -1));
}

function CalcShortestRotDirection(from, to)
{
  // If the value is positive, return true (left).
  if (CalcShortestRot(from, to) >= 0) {
    return true;
  }
  return false; // right
}
