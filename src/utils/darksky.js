const request = require('request')

//call darksky service to get weather forcast
const forecast = function (lat, long, callback) {
    const url = 'https://api.darksky.net/forecast/e0d2377971f5bd618c4dc5a77fbd6dd3/'+lat+','+long;
    
    request({url: url, json: true},function (error, response) {
        if(error){
            //low level error
            callback('Not able to connect to darksky service!', undefined)
        }else if(response.body.error){
            //location not found
            callback('Location not found!',undefined)
            
        }else{
            //forcast
            callback(undefined, 
                response.body.daily.data[0].summary + ' Current temperature is '+ 
                response.body.currently.temperature + ' and there is ' + response.body.daily.data[0].precipProbability + 
                '% probability of ' + response.body.daily.data[0].precipType)
        }
    });
}

module.exports = forecast