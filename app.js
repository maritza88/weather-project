//jshint esversion:6
const https = require('https');
const express = require('express');
const bodyParser = require('body-parser');


const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.listen(3000, function() {
    console.log("Server is running on port 3000.");
});


app.post("/", function(req, res) {

    const city = req.body.cityName;
    const appID = "2fdc6dc7ab066449d94dbe1fc5686c8d";
    const units = "metric";

    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + appID + "&units=" + units;

    https.get(url, function(response) {
        response.on("data", function(data) {
            const weatherData = JSON.parse(data);
            console.log(weatherData);
            const temp = weatherData.main.temp;
            const desc = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const iconUrl = "http://openweathermap.org/img/wn/" + icon + ".png";
            res.write("<h1>The temperature in " + city + " is " + temp + " degrees Celsius.</h1>");
            res.write("<p> The weather in " + city + " is " + desc +"</p>");
            res.write("<img src  = '" + iconUrl + " '</img>");
            res.send();
        });
    });

});

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

