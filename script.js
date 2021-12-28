// http://api.openweathermap.org/data/2.5/forecast?id=524901&appid={API key}
var requestUrl = 'http://api.openweathermap.org/data/2.5/forecast?id=(userWrite)&appid=fb5b180c997df287e25a155dffd48b42';
var apiKey = "fb5b180c997df287e25a155dffd48b42"
var userInput = document.getElementById("userInput")
console.log(userInput.value)
var currentTemp = document.getElementById("temp")
var currentWind = document.getElementById("wind")
var currentHumidity = document.getElementById("humidity")
var currentUv = document.getElementById("uv")
var button = document.getElementById("button-addon2")
var cityName = document.getElementById("city-name")
var lon = "";
var lat = "";
var userWrite = "";

button.addEventListener("click", function () {
    userWrite = userInput.value
    getApiData();
})

function getApiData() {

    fetch(
        'http://api.openweathermap.org/data/2.5/forecast?q=' + userWrite + '&units=imperial&appid=' + apiKey
    )
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data.city.coord);

            console.log(data.list[0].main.temp);
            console.log(data.list[0].wind.speed);
            console.log(data.list[0].main.humidity);
            console.log(data.city.name);
            currentTemp.textContent = "Temp " + data.list[0].main.temp;
            currentWind.textContent = "Wind " + data.list[0].wind.speed + " MPH";
            currentHumidity.textContent = "Humidity " + data.list[0].main.humidity + "%";
            cityName.textContent = data.city.name;
            lon = data.city.coord.lon;
            lat = data.city.coord.lat;
            console.log(lon)
            console.log(lat)
            getUvindex();
        })
    //         .then(getUvindex)

}

// console.log(lon)
// console.log(lat)
// var uvUrl = https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&appid=' + apiKey"
// console.log(uvUrl)
function getUvindex() {
    // console.log(lat)
    // console.log(lon)
    // console.log(typeof lat)
    fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + (lat) + '&lon=' + (lon) + '&appid=' + apiKey)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // console.log(data.current.uvi);
            currentUv.textContent = "UV index " + data.current.uvi;
        })
}

//     return (fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + apiKey))
// })
//     .then(function (response) {
//         return response.json();
//     })
//     .then(function (data) {
//         console.log(data);
//     })
// https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=hourly,daily&appid={API key}
// fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + (data.city.coord.Lat) + '&lon='(data.city.coord.Lon) + apiKey)
//     .then(function (response) {
//         return response.json();
//     })
//     .then(function (data) {
//         console.log(data)
//     })


// fetch(requestUrl)
//     .then(function (response) {
//         return response.json();
//     })
//     .then(function (data) {
//         console.log(data)
//     })


// // http://api.openweathermap.org/data/2.5/forecast?id=524901&appid={API key}
// var requestUrl = 'http://api.openweathermap.org/data/2.5/forecast?id=(userWrite)&appid=fb5b180c997df287e25a155dffd48b42';
// var apiKey = "fb5b180c997df287e25a155dffd48b42"
// var userInput = document.getElementById("userInput")
// console.log(userInput.value)

// var submitButton = document.getElementById("submit")

// submitButton.addEventListener("click", function () {
//     var userWrite = userInput.value
//     getData();
// })

// // console.log("working")
// console.log(userWrite)

// function getData() {

//     fetch(
//         'http://api.openweathermap.org/data/2.5/forecast?q=' + userWrite + '&units=imperial&appid=' + apiKey
//     )
//         .then(function (response) {
//             return response.json();
//         })
//         .then(function (data) {
//             console.log(data)
//         })
// }

// // fetch(requestUrl)
// //     .then(function (response) {
// //         return response.json();
// //     })
// //     .then(function (data) {
// //         console.log(data)
// //     })
// // submitButton.addEventListener("click", getData);