const LaunchesView = require('./views/launches_view.js');
const Launches = require('./models/launches.js')
const LaunchPads = require('./models/launch_pads.js');
const SelectLaunchpadView = require('./views/select_launchpad_view.js');
const LaunchpadView = require('./views/launchpad_view.js');

document.addEventListener('DOMContentLoaded', () => {

  const dropdown = document.querySelector('#dropdown');
  const close = document.querySelector('.close');
  const overlay = document.querySelector('.overlay');
  const popup = document.querySelector('.popup');
  popup.style = 'display: none';
  overlay.style = 'display: none';
  close.addEventListener('click', handleClickClose);

  const launches = new Launches();
  launches.getData();

  launchesView = new LaunchesView();
  launchesView.bindEvents();

  const launchpads = new LaunchPads();
  launchpads.getData();
  launchpads.bindEvents();
  

  const launchpadDropdown = new SelectLaunchpadView(dropdown);
  launchpadDropdown.bindEvents();

  const container = document.querySelector('.grid-container');
  const launchpadView = new LaunchpadView(container);
  launchpadView.render();

});

const handleClickClose = function(){
  const overlay = document.querySelector('.overlay');
  const popup = document.querySelector('.popup');
  popup.style = 'display: none';
  overlay.style = 'display: none';
}