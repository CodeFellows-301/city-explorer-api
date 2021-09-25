const axios = require('axios')


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
  const key = {lat, lon}

  let url = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=68d592738bbe4b67a204ffce2d200937`
  let weatherBitIoData = await axios.get(url)

  if(key && (date.now() - key.timestamp < 50000))
  response.send(returnWeatherData(weatherBitIoData.data))
};

module.exports={weatherBitIoCall}