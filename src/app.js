const path = require("path") //core modules come first
const express = require("express") //...then npm modules
const hbs = require("hbs")
const geocode = require("./utils/geocode") //...then custom modules
const forecast = require("./utils/forecast")

const app = express() //Express server

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public")
//standard folder name is views in the project root
const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")

//Set up handlebars view engine
app.set("view engine", "hbs")
app.set("views", viewsPath)
hbs.registerPartials(partialsPath)

//Set up static assets to serve
app.use(express.static(publicDirectoryPath))

//responses to certain GET requests from the browser
app.get("", (req, res) => {
    res.render("index", {
        title: "Weather App",
        name: "Artem Kobylin"
    })
})

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About Me",
        name: "Artem Kobylin",
        age: "23"
    })
})

app.get("/help", (req, res) => {
    res.render("help", {
        title: "Help",
        name: "Artem Kobylin",
        message: "Need help?"
    })
})

app.get("/weather", ({ query } = {}, res) => {

    if (!query.address) {
        return res.send("Please, provide a location")
    }
        
    geocode(query.address, (error, {lat, lon, location} = {}) => {
        if (error) {
            return res.send(error)
        }
        forecast(lat, lon, (error, forecast) => {
            if (error) {
               return res.send(error) 
            }
            res.send({
                location,
                forecast
            })
        })
    })    
})

app.get("/help/*", (req, res) => {
    res.render("404", {
        title: "404 page",
        errorMessage: "Help article not found",
        name: "Artem Kobylin"
    })
})

app.get("*", (req, res) => {
    res.render("404", {
        title: "404 page",
        errorMessage: "Page not found",
        name: "Artem Kobylin"
    })
})

//run the server
app.listen(3000, () => {
    console.log("Server is up on port 3000")
})