const request = require('request');


const forecast = (lat, long, callback) => {
    const url = 'https://api.darksky.net/forecast/6772c10ea5c4926babadb89a6f5f7947/'+lat+','+long+'?units=si&lang=sr'

    request({url, json: true}, (error, {body}) => {
        if(error){
            callback('Uneble to connect to location services', undefined);
        } else if (body.error){
            callback('Unable to find location', undefined);
        } else {
            callback(undefined, body.daily.data[0].summary+' It is currently '+body.currently.temperature+' degrees out. There is a '+body.currently.precipProbability+'% chance of rain');
        }
    })
}

module.exports = forecast;