const LaunchListView = require('./views/launch_list_view.js');
const Launches = require('./models/launches.js')
const LaunchPads = require('./models/launch_pads.js');
const SelectLaunchpadView = require('./views/select_launchpad_view.js');
const LaunchpadView = require('./views/launchpad_view.js');

document.addEventListener('DOMContentLoaded', () => {

  const dropdown = document.querySelector('#dropdown');

  // launchListView = new LaunchListView(container);
  // launchListView.bindEvents();

  // const launches = new Launches();
  // launches.getData();

  const launchpads = new LaunchPads();
  launchpads.bindEvents();
  launchpads.getData();

  const launchpadDropdown = new SelectLaunchpadView(dropdown);
  launchpadDropdown.bindEvents();

  const container = document.querySelector('.grid-container');
  const launchpadView = new LaunchpadView(container);
  launchpadView.render();
});