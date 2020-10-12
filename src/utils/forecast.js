const request = require('request')

const forecast = (longitude,latitude,callback)=>{

    const url = 'http://api.weatherstack.com/current?access_key=4773276a8606332020ff12d4debc058e&query='+longitude+','+latitude+'&units=m'
    request({url,json:true},(error,{body})=>{
        if(error){
            callback('Unable to connect !',undefined)
        }else if(body.error){
            callback('Unable to find location !',undefined)
        }else{
            callback(undefined,body.current.weather_descriptions+' || It is currently '+body.current.temperature+' degrees out in '+body.location.name+'. It feels like '+body.current.feelslike+' degrees out')
        }
    })
}

module.exports = forecast
