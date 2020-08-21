const path = require('path')
const express = require('express')
const dotenv = require('dotenv').config();
const hbs = require('hbs')
const request = require('request')
const getWeather = require('./utils/getWeather')

const app = express()

// Define path for Express config
const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
// app.use(express.static(publicPath))
app.use(express.urlencoded({extended: true}))
app.use(express.static(publicPath))

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        content: 'Vishal Sharma',
        name: 'Vishal Sharma'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        content:    'This Application will show the weather.',
        name: 'Vishal Sharma'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        content: 'This is a weather app',
        name: 'Vishal Sharma'
    })
})

app.get('/weather', (req, res) => {
    const {address} = req.query
    
    if(!address) {
        return res.send({
            error: 'Please provide the address term'
        })
    }
    
    getWeather(address, (error, forecast) => {
        if(error) {
            return res.send({
                error
            })
        }

        return res.send({
            address,
            forecast
        })
    })
})

app.post('/weather', (req, res) => {
    res.send('Their is high percentage of rain')
})

app.get("*", (req, res) => {
    res.send("404 Page");
})

app.listen(process.env.PORT, () => {
    console.log('Server is running at port 3000')
})