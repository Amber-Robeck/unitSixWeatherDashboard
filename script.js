var apiKey = "fb5b180c997df287e25a155dffd48b42"
var userInput = document.getElementById("userInput")
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
//TODO: Change list elements to buttons to click and bring data back up
//TODO: maybe save api data into array so when click on buttons it brings up last data, also on page reload bring up last searched city
//TODO: clear or delete button
//TODO: 5 day forcast


//put this in a function?
// checking local storage and then writing on page
var citySearch = JSON.parse(localStorage.getItem("Search"))
if (citySearch) {
    // writeList();
    for (var i = 0; i < citySearch.length; i++) {
        var savedHistory = citySearch[i];
        console.log(savedHistory)
        console.log(typeof savedHistory)
        console.log(citySearch)
        // var li = document.createElement("li");
        // li.textContent = savedHistory;
        // historyList.prepend(li);
        var buttonList = document.createElement("button");
        buttonList.textContent = savedHistory;
        buttonList.className = "list-group-item btn btn-secondary btn-block"
        historyList.prepend(buttonList);
    }
} else {
    var citySearch = [];
}//end of local storage check and write

//search button userinput saved to local storage in citySearch array
//if citySearch is >= 5 remove first item from array(oldest one) remove last list item
button.addEventListener("click", function () {
    userWrite = userInput.value
    if (citySearch.length >= 5) {
        citySearch.shift()
        citySearch.push(userWrite)
        historyList.removeChild(historyList.childNodes[4]);
    }
    else {
        citySearch.push(userWrite)
    }
    localStorage.setItem("Search", JSON.stringify(citySearch));


    getApiData();
})//end of click writer

//creating and writing list elements to page    
//changed appendChild to prepend to add most recent history first
function writeList() {
    for (var i = 0; i < citySearch.length; i++) {
        var history = citySearch[i];
        console.log(history)
    }
    var buttonList = document.createElement("button");
    buttonList.textContent = history;
    buttonList.className = "list-group-item btn btn-secondary btn-block"
    historyList.prepend(buttonList);
}//end of writeList function

//this function gets forcast api with userWrite, grabs data and writes it to user side
function getApiData() {

    fetch(
        'https://api.openweathermap.org/data/2.5/forecast?q=' + userWrite + '&units=imperial&appid=' + apiKey
    )
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // console.log(data);
            //Adding data inputs to corresponding html tags
            //would like to get rid of decimals if time allows from temp and wind speed, possibly add min/max to both
            currentTemp.textContent = "Temp " + Math.round(data.list[0].main.temp) + "F";
            currentWind.textContent = "Wind " + Math.round(data.list[0].wind.speed) + " MPH";
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
    writeList();
}//end of getApiData function


//This function is fetching onecall api to grap the uv index and write it to user side
// var cardOne = document.getElementById("day-one")
// var maxTemp = document.getElementById("max-temp")
// var minTemp = document.getElementById("min-temp")


function getUvindex() {

    fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + (lat) + '&lon=' + (lon) + '&exclude=minutely,hourly&units=imperial&appid=' + apiKey)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            currentUv.textContent = "UV index " + data.current.uvi;
            for (var i = 1; i < 6; i++) {
                //https://www.w3schools.com/js/js_dates.asp quick link for date

                var newDay = new Date(data.daily[i].dt * 1000);
                newDay = newDay.toLocaleDateString("en-US");
                // console.log(newDay)
                // console.log(data.daily[i].temp.min)
                // console.log(data.daily[i].temp.max)

                var fiveDay = document.getElementById("five-day")
                var oneDay = document.createElement("div")
                //writing index date
                oneDay.className = "card col-2 text-white bg-primary text-center";
                var forDay = document.createElement('p')
                forDay.className = "card-text text-center";
                forDay.textContent = newDay;
                var image = document.createElement('img')
                var iconCode = data.daily[i].weather[0].icon;
                var iconURL = "https://openweathermap.org/img/w/" + iconCode + ".png";
                image.src = iconURL;
                var desc = document.createElement('p')
                // desc.className = "text-center"
                desc.textContent = data.daily[i].weather[0].description;
                console.log(data.daily[i].weather[0].icon)
                // //writing index max temp
                // var maxTemp = document.createElement('p')
                // maxTemp.textContent = "High: " + Math.round(data.daily[i].temp.max) + "F";
                // //writing index min temp
                // var minTemp = document.createElement('p')
                // minTemp.textContent = "Low: " + Math.round(data.daily[i].temp.min) + "F";
                var maxMinTemp = document.createElement('p')
                // maxMinTemp.className = "text-center"
                maxMinTemp.textContent = "High: " + Math.round(data.daily[i].temp.max) + "F" + "  Low: " + Math.round(data.daily[i].temp.min) + "F";
                var humid = document.createElement('p')
                humid.textContent = "Humidty " + data.daily[i].humidity + "%";
                var windS = document.createElement('p')
                windS.textContent = "Wind " + Math.round(data.daily[i].wind_speed) + " MPH";


                oneDay.appendChild(forDay)
                oneDay.appendChild(image)
                oneDay.appendChild(desc)
                // oneDay.appendChild(maxTemp)
                // oneDay.appendChild(minTemp)
                oneDay.appendChild(maxMinTemp)
                oneDay.appendChild(humid)
                oneDay.appendChild(windS)
                fiveDay.appendChild(oneDay)



            }
            // var toAdd = document.createDocumentFragment();
            // for (var i = 1; i < 6; i++) {
            //     var newDay = new Date(data.daily[i].dt * 1000);
            //     newDay = newDay.toLocaleDateString("en-US");
            //     var newDiv = document.createElement('div');
            //     newDiv.textContent = newDay;
            //     toAdd.appendChild(newDiv);
            // }

            // document.appendChild(toAdd);


            // var cardOne = document.getElementById("day-one")
            // var fiveDayFor = document.getElementById("five-day")
            // cardOne[i].textContent = newDay
            // var maxTemp = document.createElement('p')
            // maxTemp[i].textContent = data.daily[i].temp.max
            // fiveDayFor.appendChild(cardOne, maxTemp);

            // var z = document.createElement('p'); // is a node
            // z.innerHTML = 'test satu dua tiga';
            // document.body.appendChild(z);

            // cardOne.innerHTML += "<div>" + "<p>" + newDay + "</p>" + "<p>" + "Temperature high: " + data.daily[i].temp.max + "</p>" + "<p>" + "Temperature low: " + data.daily[i].temp.min + "</p>" + "</div>";
            // fiveDayFor.appendChild("<div>" + "<p>" + newDay + "</p>" + "<p>" + "Temperature high: " + data.daily[i].temp.max + "</p>" + "<p>" + "Temperature low: " + data.daily[i].temp.min + "</p>" + "</div>");







            // fiveDayForcast();
        })
}//end of getUvindex function
// function fiveDayForcast() {
//     for (var i = 1; i < 6; i++) {
//         var newDay = new Date(data.daily[i].dt * 1000);
//         newDay = newDay.toLocaleDateString("en-US");
//         console.log(newDay)
//         console.log(data.daily[i].temp.min)
//         console.log(data.daily[i].temp.max)
//     }

;