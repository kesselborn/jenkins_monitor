$(function() {
  ApplicationController = new (Backbone.Controller.extend({
    initialize: function() {
      _.bindAll(this, 'errorFilter');
      var serverUrls = JSON.parse(localStorage["JenkinsServerOptions"]);
      var i;
      for(i=0; i< serverUrls.length; i++) {
        (s = new JenkinsServer({url:serverUrls[i]})).fetch()
      }

      $('#error-filter').bind('change', this.errorFilter);
    },

    errorFilter: function() {
      $('body').toggleClass("error-filter-state");
    }
  }));
});
