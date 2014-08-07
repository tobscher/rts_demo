window.addEventListener("resize", (function() {
  var boundaries = RTS.Services.Boundaries.instance;
  boundaries.boundariesNeedUpdating = true;
}), false);

$("body").on("contextmenu", function() {
  return false;
});
