const LaunchListView = require('./views/launch_list_view.js');
const LaunchpadListView = require('./views/launchpad_list_view.js');
const Launches = require('./models/launches.js')
const LaunchPads = require('./models/launch_pads.js');

document.addEventListener('DOMContentLoaded', () => {
  const container = document.createElement('div');
  const body = document.querySelector('body');
  body.appendChild(container);

  const launchpadListView = new LaunchpadListView(container);
  launchpadListView.bindEvents();

  // launchListView = new LaunchListView(container);
  // launchListView.bindEvents();

  // const launches = new Launches();
  // launches.getData();

  const launchpads = new LaunchPads();
  launchpads.getData();
});