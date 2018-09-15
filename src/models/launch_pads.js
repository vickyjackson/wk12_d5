const RequestHelper = require('../helpers/request_helper.js');
const PubSub = require('../helpers/pub_sub.js');

const LaunchPads = function(){

};

LaunchPads.prototype.bindEvents = function(){
  PubSub.subscribe('SelectLaunchpadView:change', (event) => {
    const selectedIndex = event.detail;
    this.publishLaunchpadDetail(selectedIndex);
  });
};

LaunchPads.prototype.getData = function () {
  const url = `https://api.spacexdata.com/v2/launchpads/`;
  const request = new RequestHelper(url);

  request.get()
    .then((data) => {
      this.data = data;
      PubSub.publish('LaunchPads:data-ready', this.data);
    })
    .catch((err) => {
      console.log(err);
    })
    
}

LaunchPads.prototype.publishLaunchpadDetail = function(launchpadIndex){
  const selectedLaunchpad = this.data[launchpadIndex];
  PubSub.publish('LaunchPads:selected-launchpad-ready', selectedLaunchpad)
};


module.exports = LaunchPads;

