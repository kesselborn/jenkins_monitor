Backbone.Model.prototype.parse = function(resp) {
  json = JSON.parse(resp);
  json.id = this.url;
  return json;
}

JenkinsJob = Backbone.Model.extend({
  initialize: function(options) {
    this.set({id: options.name, status: this.colorToState(options.color)});
  },

  colorToState: function(color) {
    switch(color) {
      case 'green':        ;
      case 'blue':         return 'ok';
      case 'green_anime':  ;
      case 'blue_anime':   return 'ok-building';

      case 'yellow':       return 'unstable';
      case 'yellow_anime': return 'unstable-building';

      case 'grey':         return 'pending';
      case 'grey':         return 'pending-building';

      case 'red':          return 'failed';
      case 'red_anime':    return 'failed-building';

      case 'aborted':      return 'aborted';
      case 'aborted_anime':return 'aborted-building';
      default:             return color;
    }
  }
});

JenkinsView = Backbone.Model.extend({
  initialize: function(options) {
    this.url = options.url + '/api/json';
    this.bind('change', this.onChange);
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
    this.bind('change', this.onChange);
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
  },

});
