const request = require('request');
const dotenv = require('dotenv').config();

const {geocodeApi} = process.env;

const geocode = (location, callback) => {
    const url = "https://api.opencagedata.com/geocode/v1/json?q=" + location + "&key=" + geocodeApi + "&limit=1";

    request({url, json: true}, (error, response) => {
        const data = response.body;
        console.log(data);

       if(error) return callback('Unable to find location', undefined);
       else if(data.status.code != 200) return callback(data.status.message, undefined);
    callback(undefined, data.results[0]);
    })
}

module.exports = geocode;