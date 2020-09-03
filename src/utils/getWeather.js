const request = require('request');
const dotenv = require('dotenv').config();
const geocode = require('./geocode');

const {weatherApi} = process.env;

const getWeather = (geocode, callback) => {
    let {lat, lng} = geocode.geometry;
    lat = lat.toFixed(2); lng = lng.toFixed(2);

    url = "https://api.openweathermap.org/data/2.5/weather?appid=" + weatherApi + "&lat=" + lat + "&lon=" + lng +"&units=metric";
    // console.log(url);
    request({url, json: true}, (error, response) => {
        if(error) callback(error, undefined);
        else if(response.body.cod != 200) callback(response.body.message, undefined);
        else {
            console.log(response.body);
            callback(undefined, {
            forecast: {
                temp: response.body.main.temp,
                desc: response.body.weather[0].description,
                icon: response.body.weather[0].icon
            },
            address: geocode.components,
            coordinates: {...geocode.geometry}
        });}     
    })
}

module.exports = getWeather