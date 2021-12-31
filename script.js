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
var fiveDay = document.getElementById("five-day");

//TODO: Occasional Glitch in writing cards on bottom of page adds to them 10+ cards
//TODO: After deleting console.logs dom is not getting cleared fast enough, need to make sure dom is cleared on click function
//maybe .empty or removeChild in getUvfunction

//TODO: find a way to only save one of each city even when multiple are displayed
//TODO: Change list elements to buttons to click and bring data back up
//TODO: maybe save api data into array so when click on buttons it brings up last data, also on page reload bring up last searched city
//TODO: clear or delete button
//TODO: Add a city to start with so page looks completed without adding hide classes or loading screen
//TODO: Add a keyboard event listener for enter key
//TODO: change some local variables to global and re-use in both current and five day forecast



//put this in a function?
// checking local storage and then writing on page
var citySearch = JSON.parse(localStorage.getItem("Search"))
if (citySearch) {
    // writeList();
    for (var i = 0; i < citySearch.length; i++) {
        var savedHistory = citySearch[i];
        var buttonList = document.createElement("button");
        buttonList.textContent = savedHistory;
        buttonList.className = "list-group-item btn btn-secondary btn-block city-button"
        historyList.prepend(buttonList);
    }
} else {
    var citySearch = [];
}//end of local storage check and write

//search button userinput saved to local storage in citySearch array
//if citySearch is >= 5 remove first item from array(oldest one) remove last list item
button.addEventListener("click", function () {
    userWrite = userInput.value
    //if nothing is in input field return
    if (userInput.value < 1) {
        return;
    }
    else if (citySearch.includes(userInput.value)) {
        //TODO:want to add push to top of list
        return;

    }
    else if (citySearch.length >= 5) {
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
    buttonList.className = "list-group-item btn btn-secondary btn-block city-button"
    historyList.prepend(buttonList);
    userInput.value = "";
}//end of writeList function

// if (document.querySelectorAll("button.city-button")) {
//     var cityHistoryBtn = document.querySelectorAll("button.city-button");
//     console.log(cityHistoryBtn.textContent);
//     cityHistoryBtn.addEventListener("click", function () {

//     }
//     )
// }

//listen for buttons inside of event listener
var savedHistoryDiv = document.getElementById("saved-history")
savedHistoryDiv.addEventListener("click", function (event) {
    var pushedButton = event.target.textContent;
    //store user event click
    //adding user click textContent to api call instead of userWrite
    //Calling functions by passing argument
    fetch(
        'https://api.openweathermap.org/data/2.5/forecast?q=' + pushedButton + '&units=imperial&appid=' + apiKey
    )
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            //Adding data inputs to corresponding html tags
            currentTemp.textContent = "Temp " + Math.round(data.list[0].main.temp) + "F";
            currentWind.textContent = "Wind " + Math.round(data.list[0].wind.speed) + " MPH";
            currentHumidity.textContent = "Humidity " + data.list[0].main.humidity + "%";
            cityName.textContent = data.city.name;
            //collecting longitude and latitude for getUvindex function
            lon = data.city.coord.lon;
            lat = data.city.coord.lat;
            //adding weather description and icons to the card
            weatherDesc.textContent = data.list[0].weather[0].description;
            var iconCode = data.list[0].weather[0].icon
            var iconURL = "https://openweathermap.org/img/w/" + iconCode + ".png";
            weatherIcon.src = iconURL;
        })
    getUvindex();


}
)

//this function gets forcast api with userWrite, grabs data and writes it to user side
function getApiData() {

    fetch(
        'https://api.openweathermap.org/data/2.5/forecast?q=' + userWrite + '&units=imperial&appid=' + apiKey
    )
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            //Adding data inputs to corresponding html tags
            currentTemp.textContent = "Temp " + Math.round(data.list[0].main.temp) + "F";
            currentWind.textContent = "Wind " + Math.round(data.list[0].wind.speed) + " MPH";
            currentHumidity.textContent = "Humidity " + data.list[0].main.humidity + "%";
            cityName.textContent = data.city.name;
            //collecting longitude and latitude for getUvindex function
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
//Currently also grabbing 5 day forecast and writing to page

function getUvindex() {

    fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + (lat) + '&lon=' + (lon) + '&exclude=minutely,hourly&units=imperial&appid=' + apiKey)
        .then(function (response) {
            //Added line to check for fiveDay children and remove them before writing
            while (fiveDay.firstChild) fiveDay.removeChild(fiveDay.firstChild);
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            currentUv.className = "list-group-item list-group-item-success"
            currentUv.textContent = "UV index " + data.current.uvi;
            for (var i = 1; i < 6; i++) {
                //https://www.w3schools.com/js/js_dates.asp quick link for date

                var newDay = new Date(data.daily[i].dt * 1000);
                newDay = newDay.toLocaleDateString("en-US");
                // var fiveDay = document.getElementById("five-day");
                //create card
                var oneDay = document.createElement("div");
                //writing index date
                oneDay.className = "card col-2 text-white bg-primary text-center";
                var forDay = document.createElement('p');
                forDay.className = "card-text text-center";
                forDay.textContent = newDay;
                //adding icon
                var image = document.createElement('img');
                var iconCode = data.daily[i].weather[0].icon;
                var iconURL = "https://openweathermap.org/img/w/" + iconCode + ".png";
                image.src = iconURL;
                //Descrition
                var desc = document.createElement('p');
                desc.textContent = data.daily[i].weather[0].description;
                //Changed variable to include both max and min temps
                var maxMinTemp = document.createElement('p');
                maxMinTemp.textContent = "High: " + Math.round(data.daily[i].temp.max) + "F" + "  Low: " + Math.round(data.daily[i].temp.min) + "F";
                //humidity
                var humid = document.createElement('p');
                humid.textContent = "Humidty " + data.daily[i].humidity + "%";
                //wind speed
                var windS = document.createElement('p');
                windS.textContent = "Wind " + Math.round(data.daily[i].wind_speed) + " MPH";


                oneDay.appendChild(forDay);
                oneDay.appendChild(image);
                oneDay.appendChild(desc);
                oneDay.appendChild(maxMinTemp);
                oneDay.appendChild(humid);
                oneDay.appendChild(windS);
                fiveDay.appendChild(oneDay);

            }
        })
}

;