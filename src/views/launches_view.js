const PubSub = require('../helpers/pub_sub.js');

const LaunchesView = function(){

};

LaunchesView.prototype.bindEvents = function(){

  PubSub.subscribe('Launches:data-ready', (event) => {
    this.launchesData = event.detail;
    this.getLaunchesBySiteId();
  });
};

LaunchesView.prototype.getLaunchesBySiteId = function(){
  PubSub.subscribe('LaunchPads:selected-launchpad-ready', (event) => {
    const selection = event.detail;
    this.launchpad = selection;
    if (selection === null) {
      // if it went back to please select...
      return;
    }
    this.launchesBySiteId = [];
    this.launchesData.forEach((launch) => {
      //console.log(launch);
      if (this.launchpad.id === launch.launch_site.site_id){
        this.launchesBySiteId.push(launch);

      };
    });
    console.log("launches view publishing launches-by-id-ready for pad " + this.launchpad.id);
    PubSub.publish('Launches:launches-by-id-ready', this.launchesBySiteId);
  });
};

module.exports = LaunchesView;