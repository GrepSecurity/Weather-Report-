const yargs = require('yargs');

const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');
var addr;
const argv = yargs
    .options({
        a: {
            demand: true,
            alias: 'address',
            describe: 'Address to fetch weather for',
            string: true

        }
    }).help().alias('help', 'h').argv;


geocode.geocodeAddress(argv.address, (errorMessage, results) => {

    if (errorMessage) {
        console.log(errorMessage);
    } else {

        console.log(JSON.stringify('Address: ' + results.address, undefined, 2));
        weather.getWeather(results.latitude, results.longitude, (errorMessage, weatherResults) => {
            if (errorMessage) {
                console.log(errorMessage);
            } else {
                var currentTemp = weatherResults.temperature;
                var apparentTemp = weatherResults.apparentTemperature;

                var ftoc_current = Math.round((currentTemp - 32) * 5 / 9);
                var ftoc_apparent = Math.round((apparentTemp - 32) * 5 / 9);

                console.log(`Current Temperature: ${ftoc_current}\xB0C`);
                console.log(`Apparent Temperature: ${ftoc_apparent}\xB0C`);
            }
        });

    }
});



// c0214e91e2f3e0d61907d9af05e5ebc3