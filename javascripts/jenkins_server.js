Backbone.Model.prototype.parse = function(resp) {
  json = JSON.parse(resp);
  json.id = this.url;
  return json;
}

JenkinsJob = Backbone.Model.extend({
  initialize: function(options) {
    this.set({id:options.name});
  }
});

JenkinsView = Backbone.Model.extend({
  initialize: function(options) {
    this.url = options.url + '/api/json';
    this.bind("change", this.onChange);
  },

  onChange: function() {
    var that = this;
    that.jenkinsJobs = [];
    _.each(this.attributes.jobs, function(job) {
      that.jenkinsJobs.push(new JenkinsJob(job));
    });
  }

});

JenkinsServer = Backbone.Model.extend({
  initialize: function(options) {
    this.set({id:options.url});
    this.url = options.url;
    this.bind("change", this.onChange);
  },

  onChange: function() {
    var that = this;
    that.jenkinsViews = [];
    _.each(this.attributes.views, function(jenkinsView) {
      var newJenkinsView = new JenkinsView(jenkinsView);
      newJenkinsView.fetch();
      that.jenkinsViews.push(newJenkinsView);
    });
    (new JenkinsServerView({model: this, id: 'js-' + this.cid})).render();
    console.log("done");
  },

});
