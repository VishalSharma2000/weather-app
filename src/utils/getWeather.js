const request = require('request');
const dotenv = require('dotenv').config();

const {apikey} = process.env;

const getWeather = (address, callback) => {
    url = "https://api.openweathermap.org/data/2.5/weather?appid=" + apikey + "&q=" + address + "&units=metric";

    // json: true => adds an header to the request, to automatically convert the JSON string into js objects.
    request({url: url, json: true}, (error, response) => {
        // since the response is JSON we need to parse and convert it into object.
        if(error) {
            callback("Unable to connect to weather service!", undefined);
        } else if(response.body.message) {
            callback("Unable to find location. Please give more details about the location.", undefined);
        } else {
            const data = response.body;
            // console.log(data);
            callback(undefined,{
                coordinate: {
                    ...data.coord
                },
                forecast: ("It is currently " + data.main.temp + " degrees out. There is a chance of " + data.weather[0].description),
                country: data.sys.country,
                icon: data.weather[0].icon
            });
            // callback(undefined, data);
        }
    });    
}

module.exports = getWeather