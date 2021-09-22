`use strict`

require('dotenv').config();
const express = require('express')
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;
const weather = require('./data/weather.json');
const { response } = require('express');



app.use(cors());



app.get('/', (request,response) => {
  response.status(200).send('hello from the home route');
});

app.get('/weather', (request,response) => {


  let city = request.query.searchQuery
  const lat = request.query.lat
  const lon = request.query.lon
  
  if(city){
    city = city.toLowerCase()
  }
  
try {
  const cityData = weather.find(citySearch => citySearch.city_name.toLowerCase() === city && citySearch.lat === lat && citySearch.lon === lon);

  returnData(city)
  
  response.send(returnArray)

} catch (error) {
   response.send(400, `error not a city`)
 }
});

class Forecast {
 constructor(date,description) {
   this.date = date,
   this.description = description
 } 
};
  


let returnArray = [];

let returnData = (obj) => {
  let date = obj.datetime
  let description = `Low of ${obj.low_temp}, Hogh of ${obj.high_temp} with ${obj.description}`  
  returnArray.push(new Forecast(date,description));
};




app.listen(PORT, () => console.log(`listening on ${PORT}`))