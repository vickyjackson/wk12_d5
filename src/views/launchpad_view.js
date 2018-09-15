const LaunchpadView = function(launchpad, container){
  this.container = container;
  this.launchpad = launchpad;
};

LaunchpadView.prototype.render = function(){

  var el = document.createElement('div');
  el.className = 'marker';

  const launchpadCoordinates = [];
  launchpadCoordinates.push(this.launchpad.location.longitude);
  launchpadCoordinates.push(this.launchpad.location.latitude);

  new mapboxgl.Marker(el)
  .setLngLat(launchpadCoordinates)
  .addTo(map);
  
  const launchpadContainer = document.createElement('div');

  const header = document.createElement('h2');
  header.textContent = this.launchpad.full_name;
  launchpadContainer.appendChild(header);

  const details = document.createElement('ul');
  launchpadContainer.appendChild(details);

  const latitude = document.createElement('li');
  latitude.textContent = this.launchpad.location.latitude;
  details.appendChild(latitude);

  const longitude = document.createElement('li');
  longitude.textContent = this.launchpad.location.longitude;
  details.appendChild(longitude);

  this.container.appendChild(launchpadContainer);
};

module.exports = LaunchpadView;