// http://api.openweathermap.org/data/2.5/forecast?id=524901&appid={API key}
var requestUrl = 'http://api.openweathermap.org/data/2.5/forecast?id=(userWrite)&appid=fb5b180c997df287e25a155dffd48b42';
var apiKey = "fb5b180c997df287e25a155dffd48b42"
var userInput = document.getElementById("userInput")
console.log(userInput.value)
var currentTemp = document.getElementById("temp")
var currentWind = document.getElementById("wind")
var currentHumidity = document.getElementById("humidity")
var currentUv = document.getElementById("uv")
var button = document.getElementById("submit")

button = addEventListener("click", function () {
    var userWrite = userInput.value
    // console.log("working")
    // console.log(userWrite)
    fetch(
        'http://api.openweathermap.org/data/2.5/forecast?q=' + userWrite + '&units=imperial&appid=' + apiKey
    )
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {

            console.log(data.list[0].main.temp)
            console.log(data.list[0].wind.speed)
            console.log(data.list[0].main.humidity)
            console.log(data.city.name)
        })
})

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