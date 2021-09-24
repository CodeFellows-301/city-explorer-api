`use strict`

require('dotenv').config();
const express = require('express')
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;
const axios = require('axios')
// const weather = require('./data/weather.json');


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
    return weatherReport;
};



app.get('/', (request,response) => {
  response.status(200).send('hello from the home route weather');
});

app.get('/weather', weatherBitIoCall)

async function weatherBitIoCall(request,response){
  let lat = request.query.lat
  let lon = request.query.lon
  let url = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=68d592738bbe4b67a204ffce2d200937`
  let weatherBitIoData = await axios.get(url)
  console.log(weatherBitIoData.data)
  response.send(returnData(weatherBitIoData.data))
  
 
 

  // } catch (error) {
  //  response.status(404).send('error not a city -> No weather Data')
  // }
};

app.listen(PORT, () => console.log(`listening on ${PORT}`))