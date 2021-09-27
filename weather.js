const axios = require('axios')
let cache = require('./cache')


class Forecast {
  constructor(time,description) {
    this.time = time,
    this.description = description
  } 
 };

function returnWeatherData(cityData){
  let weatherReport = cityData.data.map((day) =>{
    let time = day.datetime
    let description = `Low of ${day.low_temp}, High of ${day.high_temp} with ${day.weather.description}`  
    return new Forecast(time,description)
  })
    return weatherReport;
};

async function weatherBitIoCall(request,response){
  const lat = request.query.lat
  const lon = request.query.lon
  const url = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}`
  let citySearch = 'weather-' + lat + lon
 
  if(cache.weather[citySearch] && (Date.now() - cache.weather[citySearch].time < 50000)){
   response.send(cache.weather[citySearch]);
    
  } else {
    const weatherBitIoData = await axios.get(url).then(response => returnWeatherData(response.data))
    let weatherCache = {
      data: weatherBitIoData,
      time: Date.now()
    }
    cache.weather[citySearch] = weatherCache
    response.status(200).send(weatherCache);
  
    };
};

module.exports={weatherBitIoCall}