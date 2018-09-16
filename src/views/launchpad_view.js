const PubSub = require('../helpers/pub_sub.js');
const Launches = require('../models/launches.js');

const LaunchpadView = function(container){
  // .grid-container
  this.marker = null;
  this.container = container;
  this.detailsContainer = document.querySelector('.content-right-inner');
};

LaunchpadView.prototype.render = function(){

  PubSub.subscribe('LaunchPads:selected-launchpad-ready', (event) => {

    const selection = event.detail;
    this.launchpad = selection;

    this.detailsContainer.innerHTML = '';

    if(!this.launchpad){
      map.flyTo({
        zoom: 0
      });
      this.removeMapMarker();
      return;
    };

    const heading = document.createElement('h2');
    heading.textContent = this.launchpad.full_name;
    this.detailsContainer.appendChild(heading);

    const location = document.createElement('h3');
    location.textContent = `Located in ${this.launchpad.location.name}, ${this.launchpad.location.region}`
    this.detailsContainer.appendChild(location);

    const subheading = document.createElement('h3');
    subheading.textContent = `Status: ${this.launchpad.status}`;
    subheading.classList.add(this.launchpad.status.replace(/\s/g, '-'));
    this.detailsContainer.appendChild(subheading);

    const description = document.createElement('p');
    description.textContent = `${this.launchpad.details}`
    this.detailsContainer.appendChild(description);

    this.drawMapMarker();

  });
  this.getLaunchesById(this.detailsContainer);
};

LaunchpadView.prototype.getLaunchesById = function (container) {
  
  // we only want to register this once and get it added to a container

  console.log("launchpadview - subscribing to launches by id ready");
  PubSub.subscribe('Launches:launches-by-id-ready', (event) => {
    
    console.log('recieived launched-by-id');
    
    this.launchesById = event.detail;

    const rocketsLaunchedHeading = document.createElement('h4');
    if (this.launchesById.length === 0){
      rocketsLaunchedHeading.textContent = `There is no mission data for this launch site.`;
      this.detailsContainer.appendChild(rocketsLaunchedHeading);
    } else {
      rocketsLaunchedHeading.textContent = `Missions from this site:`;
      this.detailsContainer.appendChild(rocketsLaunchedHeading);
    };

    this.launchesById.forEach((launch) => {
      const launchButton = document.createElement('button');
      launchButton.innerHTML = `<i class="fas fa-rocket"></i><br> ${launch.mission_name}`;
      container.appendChild(launchButton);
    });


  });
  
};

LaunchpadView.prototype.drawMapMarker = function(){
  var el = document.createElement('div');
  el.className = 'marker';

  this.removeMapMarker();

  const launchpadCoordinates = [];
  launchpadCoordinates.push(this.launchpad.location.longitude);
  launchpadCoordinates.push(this.launchpad.location.latitude);

  this.marker = new mapboxgl.Marker(el)
  .setLngLat(launchpadCoordinates)
  .addTo(map);
  console.log('adding map marker');

  map.flyTo({
    zoom: 12,
    center: [
      this.launchpad.location.longitude,
      this.launchpad.location.latitude],
  });

};

LaunchpadView.prototype.removeMapMarker = function(){
  if (this.marker !== null){
    this.marker.remove();
    console.log('removing map marker');
  }
};

module.exports = LaunchpadView;