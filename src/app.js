const path = require('path')
const express = require('express');
const hbs = require('hbs')

const geocode = require('../utils/geocode');
const forecast = require('../utils/forecast');

console.log(__dirname);

const app = express();

//Define paths for express config
const publicPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engineand view location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

// Setup static directory to serve
app.use(express.static(publicPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Ivan'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Ivan'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        msg: 'Message',
        name: 'Ivan'
    })
})

app.get('/weather', (req, res) => {

    if(!req.query.address){
        return res.send({
            error: 'You must provide address'
        })
    }

    geocode(req.query.address, (error, {lattitude, longitude, location} = {}) => {
        if(error){
            return res.send({error})
        }
        forecast(lattitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({error})
            }
            res.send({
                location: location, 
                forecast: forecastData,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {

    if(!req.query.search){
        return res.send({
            error: 'You must provide search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('help', {
        title: '404',
        msg: '404 Help',
        name: 'Ivan'
    })
})

app.get('*', (req, res) => {
    res.render('help', {
        title: '404',
        msg: '404',
        name: 'Ivan'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000');
})