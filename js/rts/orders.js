var Orders = Class.extend({
  init: function() {
    this.$target = $("#orders");
  },

  setTitle: function(title) {
    this.$target.find("h1").text(title);
  }
});
