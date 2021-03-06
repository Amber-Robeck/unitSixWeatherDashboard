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
var savedHistoryDiv = document.getElementById("saved-history")


// checking local storage and then writing on page
function getSaved() {
    if (JSON.parse(localStorage.getItem("Search"))) {
        citySearch = JSON.parse(localStorage.getItem("Search"))
        //grabs last searched item
        userWrite = citySearch[citySearch.length - 1];
        //displaying last searched city on page
        getApiData(userWrite);
        loopCity(0);
        removeLoadCity();
    } else {
        //adds a default city to the display page if user does not have local storage
        var loadCity = ["Anchorage"];
        localStorage.setItem("Load", JSON.stringify(loadCity));
        userWrite = "Anchorage";
        getApiData(userWrite);


    }
}//end of local storage check and write

//Removes local storage item Load
function removeLoadCity() {
    if (JSON.parse(localStorage.getItem("Search"))) {
        localStorage.getItem("Load");
        localStorage.removeItem("Load");
    }
}


//This function creates buttons for the  saved history search when page is loaded
function loopCity(n) {
    var para = n;
    for (var i = para; i < citySearch.length; i++) {
        var savedHistory = citySearch[i];
        var buttonList = document.createElement("button");
        buttonList.textContent = savedHistory;
        buttonList.className = "list-group-item btn btn-secondary btn-block city-button"
        historyList.prepend(buttonList);
    }
}

//search button userinput saved to local storage in citySearch array
//if citySearch is >= 5 remove first item from array(oldest one) remove last list item
button.addEventListener("click", function () {
    userWrite = userInput.value
    //if nothing is in input field return
    if (userInput.value < 1) {
        alert("You must enter in a valid city!")
        return;
    }
    else if (citySearch.length >= 5) {
        citySearch.shift()
        citySearch.push(userWrite)
        historyList.removeChild(historyList.childNodes[4]);
        localStorage.setItem("Search", JSON.stringify(citySearch));

    }
    else {
        console.log(citySearch)
        citySearch.push(userWrite)
        localStorage.setItem("Search", JSON.stringify(citySearch));

    }

    getApiData(userWrite);
    writeList();
})//end of click writer


//making enter key function for the userInput
userInput.addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
        button.click();
    }
})


//creating and writing list elements to page    
//needs an if statement to rule out strings to prevent error in click function
function writeList() {
    for (var i = 0; i < citySearch.length; i++) {
        var history = citySearch[i];
    }
    var buttonList = document.createElement("button");
    buttonList.textContent = history;
    buttonList.className = "list-group-item btn btn-secondary btn-block city-button"
    historyList.prepend(buttonList);
    userInput.value = "";
}//end of writeList function


//listening for buttons inside of div

savedHistoryDiv.addEventListener("click", function (event) {
    var pushedButton = event.target.textContent;
    getApiData(pushedButton);
    getUvindex();
}
)


// }
// )

//this function gets forcast api with userWrite, grabs data and writes it to user side
function getApiData(input) {
    var cityInput = input;

    fetch(
        'https://api.openweathermap.org/data/2.5/forecast?q=' + cityInput + '&units=imperial&appid=' + apiKey
    )
        .then(function (response) {
            if (response.status !== 200) {
                alert("Something went wrong, please try again.")
                return;
            }
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
}//end of getApiData function


//This function is fetching onecall api to grap the uv index and write it to user side
function getUvindex() {

    fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + (lat) + '&lon=' + (lon) + '&exclude=minutely,hourly&units=imperial&appid=' + apiKey)
        .then(function (response) {
            //Added line to check for fiveDay children and remove them before writing
            while (fiveDay.firstChild) fiveDay.removeChild(fiveDay.firstChild);
            return response.json();
        })
        .then(function (data) {
            var dataObj = data;
            currentUv.textContent = "UV index " + data.current.uvi;
            if (data.current.uvi <= 2) {
                currentUv.className = "list-group-item list-group-item-success"
            } else if (data.current.uvi > 2 && data.current.uvi <= 5) {
                currentUv.className = "list-group-item list-group-item-warning"
            } else {
                currentUv.className = "list-group-item list-group-item-danger"
            }
            fiveDayForecast(dataObj);
        })
}
//creating and writing the 5 day forecast to the page
function fiveDayForecast(da) {
    var data = da;
    for (var i = 1; i < 6; i++) {
        //https://www.w3schools.com/js/js_dates.asp quick link for date

        var newDay = new Date(data.daily[i].dt * 1000);
        newDay = newDay.toLocaleDateString("en-US");
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
}

getSaved();
