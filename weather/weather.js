const req = require('request');

var getWeather=(lat, lng, callback)=>{
    req({
        //place your API Key here
        url:`https://api.darksky.net/forecast/APIKEY/${lat},${lng}`,
        json: true
    },(error,response,body)=>{
        if(error){
            callback('unable to connect to the servers ');
    
        }
       
        else if (!error & response.statusCode===200){

            callback(undefined,{
                temperature:body.currently.temperature,
                apparentTemperature: body.currently.apparentTemperature
            });

        }
        else{
            callback('unable to fetch the weather');
        }
        
    });
};

module.exports.getWeather=getWeather;