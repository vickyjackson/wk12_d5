const RequestHelper = require('../helpers/request_helper.js');
const PubSub = require('../helpers/pub_sub.js');

const Launches = function(){

};

Launches.prototype.getData = function () {
  const url = `https://api.spacexdata.com/v2/launches/`;
  const request = new RequestHelper(url);

  request.get()
    .then((data) => {
      this.data = data;
      PubSub.publish('Launches:data-ready', this.data);
    })
    .catch((err) => {
      console.log(err);
    })
}

module.exports = Launches;

