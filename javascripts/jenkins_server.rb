JenkinsServer = function(url) {
  this.url = url;

  this.getServerState = function(){
    $.getJSON(url, function(data) {
      console.log(data);
    });
  }
};
