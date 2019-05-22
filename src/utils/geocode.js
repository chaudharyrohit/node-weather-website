const request = require('request')

//Use mapbox, to find latitude and longitude based on address string
const geocodeFunc = function (address, callback) {
    const geocodeURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1Ijoicm9oaXRjaDg0IiwiYSI6ImNqdm9ram92dzF6cTY0YW9pa2Q5bTBtdjUifQ.eIlJlLh158JMj0TCHAgtjw'; 

    request({url: geocodeURL, json: true}, function (error, response) {
        if(error){
            //low level error
            callback('Not able to connect to geocoding service!',undefined)
        }else if(response.body.features.length==0){
            //location not found
            
            callback('Location not found!', undefined)
        }else{
            //coordinates
            const center = response.body.features[0].center
            callback(undefined,{
                'latitude': center[1],
                'longitude': center[0],
                'location': response.body.features[0].place_name
            })
        }
    })
}

module.exports=geocodeFunc;