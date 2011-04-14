$(function() {
  ApplicationController = new (Backbone.Controller.extend({
    initialize: function() {
      _.bindAll(this, 'errorFilter');
      (s = new JenkinsServer({url:"http://builder.soundcloud.com/api/json"})).fetch()
      console.log("checkout s:");
      console.log(s);

      $('#error-filter').bind('change', this.errorFilter);
    }, 

    errorFilter: function() {
      $('body').toggleClass("error-filter-state");
    }
  }));
});
