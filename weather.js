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
  let lat = request.query.lat
  let lon = request.query.lon
  let url = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=68d592738bbe4b67a204ffce2d200937`
  let weatherBitIoData = await axios.get(url)
  console.log(weatherBitIoData.data)
  response.send(returnWeatherData(weatherBitIoData.data))
};

module.exports={weatherBitIoCall}