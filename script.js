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
var weatherDesc = document.getElementById("description")
var historyList = document.getElementById("history")
var lon = "";
var lat = "";
var citySearch = [];
var userWrite = "";
var weatherIcon = document.getElementById("icon")



//TODO: find a way to only save one of each city even when multiple are displayed
//TODO: display search history in reverse order, maybe max number of searches then delete
//TODO: Change list elements to buttons to click and bring data back up

// checking local storage and then writing on page
var citySearch = JSON.parse(localStorage.getItem("Search"))
if (citySearch) {
    // writeList();
    for (var i = 0; i < citySearch.length; i++) {
        var savedHistory = citySearch[i];
        console.log(savedHistory)
        console.log(typeof savedHistory)
        console.log(citySearch)
        var li = document.createElement("li");
        li.textContent = savedHistory;
        historyList.appendChild(li);
    }
} else {
    var citySearch = [];
}

//search button userinput saved to local storage in citySearch array
button.addEventListener("click", function () {
    userWrite = userInput.value
    citySearch.push(userWrite)
    localStorage.setItem("Search", JSON.stringify(citySearch));


    getApiData();
    writeList();
})

//creating and writing list elements to page    
function writeList() {
    for (var i = 0; i < citySearch.length; i++) {
        var history = citySearch[i];
        console.log(history)

    }
    var li = document.createElement("li");
    li.textContent = history;
    // li.setAttribute("data-index", i);
    historyList.appendChild(li);
}

//this function gets forcast api with userWrite, grabs data and writes it to user side
function getApiData() {

    fetch(
        'https://api.openweathermap.org/data/2.5/forecast?q=' + userWrite + '&units=imperial&appid=' + apiKey
    )
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            //Adding data inputs to corresponding html tags
            //would like to get rid of decimals if time allows from temp and wind speed, possibly add min/max to both
            currentTemp.textContent = "Temp " + data.list[0].main.temp;
            currentWind.textContent = "Wind " + data.list[0].wind.speed + " MPH";
            currentHumidity.textContent = "Humidity " + data.list[0].main.humidity + "%";
            cityName.textContent = data.city.name;
            lon = data.city.coord.lon;
            lat = data.city.coord.lat;
            //adding weather description and icons to the card
            weatherDesc.textContent = data.list[0].weather[0].description;
            var iconCode = data.list[0].weather[0].icon
            var iconURL = "https://openweathermap.org/img/w/" + iconCode + ".png";
            weatherIcon.src = iconURL;
            getUvindex();
        })
}

// console.log(lon)
// console.log(lat)
// var uvUrl = https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&appid=' + apiKey"
// console.log(uvUrl)

//This function is fetching onecall api to grap the uv index and write it to user side
function getUvindex() {
    // console.log(lat)
    // console.log(lon)
    // console.log(typeof lat)
    fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + (lat) + '&lon=' + (lon) + '&appid=' + apiKey)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
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