const request = require("request")

const geocode = (location, callback) => {

    const geocodeURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(location)}.json?access_token=pk.eyJ1IjoiYXJ0ZW1rb2J5bGluIiwiYSI6ImNrOXZsbGtoYzAwYjUzaHVobXhjd3h6ZTQifQ.1rFh2iFkbuHlOOHBA1YmCA&limit=1`
    request({ url: geocodeURL, json: true }, (error, { body } = {}) => {
        if (error) {
            callback(error)
        } else if (body.features.length === 0) {
            callback("Provide a valid location")
        } else {
            callback(undefined, {
                lat: body.features[0].center[1],
                lon: body.features[0].center[0],
                location: "Your location is " + body.features[0].place_name
            })
        }
    })
}

module.exports = geocode