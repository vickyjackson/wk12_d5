const PubSub = require('../helpers/pub_sub.js');
const LaunchView = require('../views/launch_view.js');

const LaunchListView = function(container){
  this.container = container;
};

LaunchListView.prototype.bindEvents = function(){
  PubSub.subscribe('Launches:data-ready', (event) => {
    this.launchesData = event.detail;
    this.render();
  });
};

LaunchListView.prototype.render = function(){
  this.launchesData.forEach((launch) => {
    const launchView = new LaunchView(launch, this.container);
    launchView.render();
  });
};

module.exports = LaunchListView;