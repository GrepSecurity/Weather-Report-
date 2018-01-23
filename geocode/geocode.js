const request = require('request');

var geocodeAddress = (address, callback)=>{
    var encodedAdrs = encodeURIComponent(address);
    request({
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAdrs}`,
        json: true
    }, (error, response, body) => {
    
        if (error) {
            callback('\nUnable to connect to Google servers.\n');
            
        } else if (body.status === 'ZERO_RESULTS' || encodedAdrs === '') {
            callback(`\nUnable to find the address \'${encodedAdrs}\', please provide a valid address.\n `)
            
        } else if (response.statusCode === 200) {
            callback(undefined,{
                address:body.results[0].formatted_address,
                latitude:body.results[0].geometry.location.lat,
                longitude: body.results[0].geometry.location.lng
            })
        }
    
    });
}

module.exports.geocodeAddress=geocodeAddress;

