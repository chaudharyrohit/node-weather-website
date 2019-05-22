const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/darksky')


const app = express();

const publicDirectoryPath = path.join(__dirname,'../public') 
const viewsPath = path.join(__dirname,'../templates/views') 
const partialsPath = path.join(__dirname,'../templates/partials') 

app.set('view engine', 'hbs'); 
app.set('views', viewsPath); // allows to customize views directory
app.use(express.static(publicDirectoryPath)) // for serving static content 

hbs.registerPartials(partialsPath)

app.get('', (req, res) =>{
    res.render('index',{
        title: 'Weather app',
        name: 'Andrew Mead',
        creator: 'Sunny Deol'
    })
})

app.get('/help', (req, res) =>{
    res.render('help',{
        title: 'Contact Us',
        name: 'Andrew Mead',
        creator: 'Sunny Deol'
    })
})

app.get('/about', (req, res) =>{
    res.render('about',{
        title: 'About Me',
        name: 'Andrew Mead',
        creator: 'Sunny Deol'
    })
})

 app.get('/weather', (req, res) =>{
    debugger
    if(!req.query.address){
        return res.send({
            error: 'Please provide the address to get the forecast!'
        })
    }

    geocode(req.query.address, (error, data) => {
        if(error){
            return res.send({
                error: error
            })
        }

        forecast(data.latitude, data.longitude, (error, forecastData) => {
            if(error){
                return res.send({
                    error: error
                })
            }

            res.send({
                location: data.location,
                forecast: forecastData,
                address: req.query.address
            })
        })
    })
})

 //Error handlers
 app.get('/help/*', (req, res) =>{
    res.render('error',{
        title: 'Error page',
        errorMsg: 'Help article not found'
    });
 })

 app.get('*', (req, res) =>{
    res.render('error',{
        title: 'Error page',
        errorMsg: 'Page not found'
    })
 })

app.listen(3000, () => {
    console.log('Server started on port 3000')
})