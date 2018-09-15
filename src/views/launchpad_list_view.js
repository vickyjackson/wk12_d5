const PubSub = require('../helpers/pub_sub.js');
const LaunchpadView = require('../views/launchpad_view.js');

const LaunchPadListView = function(container){
  this.container = container;
};

LaunchPadListView.prototype.bindEvents = function(){
  PubSub.subscribe('LaunchPads:data-ready', (event) => {
    this.launchPadsData = event.detail;
    this.render();
  });
};

LaunchPadListView.prototype.render = function(){
  this.launchPadsData.forEach((launchpad) => {
    const launchPadView = new LaunchpadView(launchpad, this.container);
    launchPadView.render();
  });
};

module.exports = LaunchPadListView;