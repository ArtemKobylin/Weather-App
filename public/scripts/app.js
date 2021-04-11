const locationMessage = document.querySelector("#location-message")
const weatherMessage = document.querySelector("#weather-message")
const input = document.querySelector("input")
const form = document.querySelector("form")

form.addEventListener("submit", (e) => {
    e.preventDefault()

    fetch("http://localhost:3000/weather?address=" + input.value).then((response) => {
        response.json().then((data) => {
            locationMessage.textContent = data.location
            weatherMessage.textContent = data.forecast
        }) 
    })
})
