// Init storage 
const storage = new Storage();

// Get Stored location data
const weatherLocation = storage.getLocationData();

// Init weather Object
const weather = new weather(weatherLocation.city, weatherLocation.state)

// Init UI
const ui = new UI();

// Get weather on DOM load
document.addEventListener('DOMContentLaoded', getWeather)


// Change Location event
document.getElementById('w-change-btn').addEventListener('click', (ev) => {
const city = document.getElementById('city').value
const state = document.getElementById('state').value

// Change Location
weather.changeLocation(city, state);
// Set Location in LS
storage.setLocationData(city, state);

// Get and display weather
getWeather()

  // Close modal
  $('#locModal').modal('hide');
});

function getWeather() {
  weather.getWeather()
    .then(results => {
      ui.paint(results);
    })
    .catch(err => console.log(err));
}


