RTS.HUD.BuildQueue = function(container) {
  this.container = container.find("#build_queue");
  this.percentMeter = this.container.find(".build_queue-current-progress-meter");
  this.queue = [];

  this.slotSelectors = {
    "1": ".build_queue-current-1",
    "2": ".build_queue-next-2",
    "3": ".build_queue-next-3",
    "4": ".build_queue-next-4",
    "5": ".build_queue-next-5",
  };
};

RTS.HUD.BuildQueue.prototype.push = function(build) {
  this.queue.push(build);

  var selector = ".build_queue-";

  if (this.queue.length > 1) {
    selector = selector + "next-" + this.queue.length;
  } else {
    selector = selector + "current-1";
  }

  var element = this.container.find(selector);

  $.ajax(build.icon, {
    dataType: "html",
    success: function(data, textStatus, jqXHR) {
      var image = data;
      element.html(image);
    }
  });
};

RTS.HUD.BuildQueue.prototype.shift = function() {
  if (this.queue.length == 0) return;

  this.update(0);

  if (this.queue.length > 1) {
    for (var i = 1; i < this.queue.length; i++) {
      var prevSlot = this.container.find(this.slotSelectors[i]);
      var slot = this.container.find(this.slotSelectors[i + 1]);
      prevSlot.html(slot.html());
    }
  }

  var lastSlot = this.container.find(this.slotSelectors[this.queue.length]);
  var number = $("<span></span>").text(this.queue.length);
  lastSlot.html(number);

  this.queue.shift();
};

RTS.HUD.BuildQueue.prototype.cancel = function() {
  if (this.queue.length == 0) return;

  this.queue.pop();
};

RTS.HUD.BuildQueue.prototype.update = function(percent) {
  this.percentMeter.css('width', percent + "%");
};
