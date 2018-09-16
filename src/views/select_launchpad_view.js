const PubSub = require('../helpers/pub_sub.js');

const SelectLaunchpadView = function (element) {
  this.element = element;
};

SelectLaunchpadView.prototype.bindEvents = function () {
  PubSub.subscribe('LaunchPads:data-ready', (event) => {
    this.allLaunchpads = event.detail;
    this.populate(this.allLaunchpads);
  });

  this.element.addEventListener('change', (event) => {
    const selectedIndex = event.target.value;
    PubSub.publish('SelectLaunchpadView:change', selectedIndex);
  });
};

SelectLaunchpadView.prototype.populate = function (launchpadsData) {
  const defaultOption = document.createElement('option');
  defaultOption.textContent = "Please select a launch site...";
  this.element.appendChild(defaultOption);
  launchpadsData.forEach((launchpad, index) => {
    const option = document.createElement('option');
    //console.log(launchpad);
    option.textContent = launchpad.full_name;
    option.value = index;
    this.element.appendChild(option);
  })
}

module.exports = SelectLaunchpadView;