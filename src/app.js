const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()

const port = process.env.PORT || 3000

//Define paths for Express config
const publicDirPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup handlebars engine and view locations
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve

app.use(express.static(publicDirPath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather app',
        name:'Vineet'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Me',
        name:'Vineet' 
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        message: 'Website is under construction',
        title: 'Help',
        name:'Vineet'
    })
})

app.get('/weather',(req,res)=>{
    const address = req.query.address
    if(!req.query.address){
    return res.send({
        error: 'Must provide an address'
    })}

    geocode(address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({error})
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location,
                address: address
            })
          })
    })

})

app.get('/products',(req,res)=>{
    console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'Error page',
        errorMessage : 'Help Article not found',
        name:'Vineet'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'Error Page',
        errorMessage:'Page not found',
        name:'Vineet'
    })
})

app.listen(port, ()=>{
    console.log('Server started on port'+port)
})