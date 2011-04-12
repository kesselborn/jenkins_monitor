Backbone.Model.prototype.parse = function(resp) {
  json = JSON.parse(resp);
  json.id = this.url;
  return json;
}

Job = Backbone.Model.extend({
  initialize: function(options) {
    this.set({id:options.name});
  }
});

View = Backbone.Model.extend({
  initialize: function(options) {
    this.url = options.url;
    this.bind("change", this.onChange);
  },

  onChange: function() {
    var that = this;
    that.jobs = [];
    _.each(this.attributes.jobs, function(job) {
      that.jobs.push(new Job(job));
    });
  }

});

Server = Backbone.Model.extend({
  initialize: function(options) {
    this.set({id:options.url});
    this.url = options.url;
    this.bind("change", this.onChange);
  },

  onChange: function() {
    var that = this;
    that.views = [];
    _.each(this.attributes.views, function(view) {
      var newView = new View({url:view.url + "/api/json"});
      newView.fetch();
      that.views.push(newView);
    });
    console.log("done");
  },

});


JenkinsServer = function(url) {
  this.url = url;

  this.getServerState = function(callback){
    $.getJSON(url, function(data){
      console.log(data);
    });
  }
};
