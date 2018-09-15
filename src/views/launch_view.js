const LaunchView = function(launch, container){
  this.container = container;
  this.launch = launch;
};

LaunchView.prototype.render = function(){
  const launchContainer = document.createElement('div');

  const header = document.createElement('h2');
  header.textContent = this.launch.mission_name;
  launchContainer.appendChild(header);

  const details = document.createElement('ul');
  launchContainer.appendChild(details);

  const launchDate = document.createElement('li');
  launchDate.textContent = `Launch date (UTC): ${this.launch.launch_date_utc}`;
  details.appendChild(launchDate);

  const launchSite = document.createElement('li');
  launchSite.textContent = `Launch site: ${this.launch.launch_site.site_id}`;
  details.appendChild(launchSite);
  
  this.container.appendChild(launchContainer);
};

module.exports = LaunchView;