`use strict`

require('dotenv').config();
const express = require('express')
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;
const weather = require('./data/weather.json');
console.log(weather)

app.use(cors());

class Forecast {
  constructor(time,description) {
    this.time = time,
    this.description = description
  } 
 };

function returnData(cityData){
  let weatherReport = cityData.data.map((day) =>{
    let time = day.datetime
    let description = `Low of ${day.low_temp}, High of ${day.high_temp} with ${day.weather.description}`  
    return new Forecast(time,description)
  })
    console.log(weatherReport)
    return weatherReport;
};



app.get('/', (request,response) => {
  response.status(200).send('hello from the home route');
});

app.get('/weather', (request,response) => {


  let city = request.query.searchQuery
  let lat = request.query.lat
  let lon = request.query.lon
  if(city){
    city = city.toLowerCase()

  }
  
try {
  let cityData = weather.find((citySearch) => 
    citySearch.city_name.toLowerCase() === city &&
    citySearch.lat === lat && 
    citySearch.lon === lon);
    // let weatherReport = cityData.data.map(day => new Forecast(day.datetime,day.weather.description))
  
   response.send(returnData(cityData));

} catch (error) {
   response.status(500).send('error not a city')
 }
});

app.listen(PORT, () => console.log(`listening on ${PORT}`))