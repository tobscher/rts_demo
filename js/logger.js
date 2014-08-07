var Logger = function() {
  this.$element = $("<div></div>").attr('id', 'log');
  this.element = this.$element[0];
  $("#container").append(this.$element);

  Logger.instance = this;
};

Logger.prototype.log = function(message) {
  this.$element.append($("<p>").text(message));
  this.element.scrollTop = this.element.scrollHeight;
};

window.logger = new Logger();
