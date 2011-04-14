$(function() {
  JenkinsServerView = Backbone.View.extend({
    tagName: 'li',
    className: 'jenkins-server',
    template: _.template($('#jenkins-server-template').html()),

    initialize: function(options) {
      _.bindAll(this, 'render');
      //this.model.bind('change', this.render);
      this.model.view = this;
    },

    renderJenkinsViews: function() {
      var that = this;
      _.each(this.model.jenkinsViews, function(jenkinsView) {
        that.$(".jenkins-views").append((new JenkinsViewView({model: jenkinsView})).render().el);
      });
    },

    render: function() {
      $('#jenkins-servers').append(this.el);
      $(this.el).html(this.template(this.model.toJSON()));
      this.renderJenkinsViews();
      return this;
    }
  });

  JenkinsViewView = Backbone.View.extend({
    tagName: 'li',
    className: 'jenkins-view',
    template: _.template($('#jenkins-view-template').html()),

    initialize: function(options) {
      _.bindAll(this, 'render');
      this.model.bind('change', this.render);
      this.model.view = this;
    },

    renderJenkinsJobs: function() {
      var that = this;
      _.each(this.model.jenkinsJobs, function(jenkinsJob) {
        that.$(".jenkins-jobs").append((new JenkinsJobView({model: jenkinsJob})).render().el);
      });
    },

    render: function() {
      $(this.el).html(this.template(this.model.toJSON()));
      this.renderJenkinsJobs();
      return this;
    }
  });

  JenkinsJobView = Backbone.View.extend({
    tagName: 'li',
    className: 'jenkins-job',
    template: _.template($('#jenkins-job-template').html()),

    initialize: function(options) {
      _.bindAll(this, 'render');
      //this.model.bind('change', this.render);
      this.model.view = this;
    },

    render: function() {
      $(this.el).html(this.template(this.model.toJSON()));
      return this;
    }
  });

});
