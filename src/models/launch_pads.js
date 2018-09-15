const RequestHelper = require('../helpers/request_helper.js');
const PubSub = require('../helpers/pub_sub.js');

const LaunchPads = function(){

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

module.exports = LaunchPads;

