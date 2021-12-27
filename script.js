// http://api.openweathermap.org/data/2.5/forecast?id=524901&appid={API key}
var requestUrl = 'http://api.openweathermap.org/data/2.5/forecast?id=(userWrite)&appid=fb5b180c997df287e25a155dffd48b42';
var apiKey = "fb5b180c997df287e25a155dffd48b42"
var userInput = document.getElementById("userInput")
console.log(userInput.value)

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
            console.log(data)
        })
})

// fetch(requestUrl)
//     .then(function (response) {
//         return response.json();
//     })
//     .then(function (data) {
//         console.log(data)
//     })