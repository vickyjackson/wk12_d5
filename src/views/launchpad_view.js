const PubSub = require('../helpers/pub_sub.js');

const LaunchpadView = function(container){
  // .grid-container
  this.marker = null;
  this.container = container;
};

LaunchpadView.prototype.render = function(){

  PubSub.subscribe('LaunchPads:selected-launchpad-ready', (event) => {

    const selection = event.detail;
    this.launchpad = selection;

    const detailsContainer = document.querySelector('.content-right-inner');
    detailsContainer.innerHTML = '';

    const heading = document.createElement('h2');
    heading.textContent = this.launchpad.full_name;
    detailsContainer.appendChild(heading);

    const location = document.createElement('h3');
    location.textContent = `Located in ${this.launchpad.location.name}, ${this.launchpad.location.region}`
    detailsContainer.appendChild(location);

    const subheading = document.createElement('h3');
    subheading.textContent = `Status: ${this.launchpad.status}`;
    detailsContainer.appendChild(subheading);

    const description = document.createElement('p');
    description.textContent = `${this.launchpad.details}`
    detailsContainer.appendChild(description);

    const rocketsLaunchedHeading = document.createElement('p');
    rocketsLaunchedHeading.textContent = `Vehicles launched from this site:`;
    detailsContainer.appendChild(rocketsLaunchedHeading);

    this.getRockets(detailsContainer);
    this.drawMapMarker();

  });
};

LaunchpadView.prototype.getRockets = function (container) {
  this.launchpad.vehicles_launched.forEach((rocket) => {
    const rocketButton = document.createElement('button');
    rocketButton.innerHTML = `<i class="fas fa-rocket"></i><br> ${rocket}`;
    container.appendChild(rocketButton);
  });
};

LaunchpadView.prototype.drawMapMarker = function(){
  var el = document.createElement('div');
  el.className = 'marker';

  if (this.marker !== null){
    this.marker.remove();
    console.log('removing map marker');
  }

  const launchpadCoordinates = [];
  launchpadCoordinates.push(this.launchpad.location.longitude);
  launchpadCoordinates.push(this.launchpad.location.latitude);

  this.marker = new mapboxgl.Marker(el)
  .setLngLat(launchpadCoordinates)
  .addTo(map);
  console.log('adding map marker');

};

module.exports = LaunchpadView;