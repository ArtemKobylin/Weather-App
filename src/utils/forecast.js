const request = require("request")

const forecast = (lat, lon, callback) => {

    const weatherURL = `http://api.weatherstack.com/current?access_key=cff4c79d09da96ac40004260a423f123&query=${lat},${lon}&units=m`
    
    request({ url: weatherURL, json: true }, (error, { body }) => {
        if (error) {
            callback(error)
        } else if (body.error) {
            callback(body.error)
        } else {
            const description = body.current.weather_descriptions[0]
            const temperature = body.current.temperature + "°C"
            const precipitation = body.current.precip + "%"
            const humidity = body.current.humidity + "%"
            callback(undefined, `
                The weather is ${description}.
                It is ${temperature} outside.
                Humidity is ${humidity}.
                There is a ${precipitation} chance of precipitation.
                `)     
        }
    })
}



module.exports = forecast