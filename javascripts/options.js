function addNewServer() {
  var url = $('#add-new-server-form input').val();

  if(url.indexOf('api/json') < 0) {
    url = url + "/api/json";
  }
  url = url.replace(/([^:])\/\//, "$1/");

  var entry = new OptionsEntryView({url: url});

  $('#add-new-server-form input[type=text]').val('');
  $('#jenkins-servers').append(entry.render().el);

  options = JSON.parse(localStorage["JenkinsServerOptions"]);
  options.push(url);

  localStorage["JenkinsServerOptions"] = JSON.stringify(options);

  return false;
}

function removeServer(url) {
  var serverUrls = JSON.parse(localStorage["JenkinsServerOptions"]);
  var i;
  for(i=0; i< serverUrls.length; i++) {
    if(serverUrls[i] === url) {
      serverUrls[i] = null;
    }
    break;
  }

  localStorage["JenkinsServerOptions"] = JSON.stringify(_.compact(serverUrls));
}

$(function() {
  OptionsEntryView = Backbone.View.extend({
    tagname: 'li',
    url: null,
    template: _.template($('#options-entry-template').html()),

    initialize: function(options) {
      _.bindAll(this, 'remove')
      this.options = options;
      this.url = options.url;
    },

    events: {
      "click .remove": 'remove'
    },

    remove: function() {
      removeServer(this.url);
      $(this.el).remove();
    },

    render: function() {
      $(this.el).html(this.template(this.options));
      return this;
    }
  });

  var stringifiedOptions = localStorage["JenkinsServerOptions"];
  var options;


  if(stringifiedOptions) {
    var i;
    options = JSON.parse(stringifiedOptions);

    for(i=0; i<options.length; i++) {
      var entry = new OptionsEntryView({url: options[i]});
      $('#jenkins-servers').append(entry.render().el);
    }
  } else {
    localStorage["JenkinsServerOptions"] = "[]";
  }
});
