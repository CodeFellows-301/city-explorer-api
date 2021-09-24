`use strict`

require('dotenv').config();
const express = require('express')
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;
const axios = require('axios');
const { response } = require('express');
// const weather = require('./data/weather.json');


app.use(cors());
app.get('/', (request,response) => {
  response.status(200).send('hello from the home route weather');
});





app.get('/weather', weatherBitIoCall)
app.get('/movie', movieDB)



class Forecast {
  constructor(time,description) {
    this.time = time,
    this.description = description
  } 
 };

class Movie {
  constructor(movieData) {
    this.title = movieData.title
    this.overview = movieData.overview
    this.average_votes = movieData.average_votes
    this.total_votes = movieData.total_count
    this.popularity = movieData.popularity
    this.released_on = movieData.released_on
    this.image_url = movieData.image_url
  }
}

function returnMovie(movieInfo){
  const movies = movieInfo.data.results.map(movie => {
    return new Movie(movie)
  })
    return movies;
}

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

async function movieDB(request,response){
  let search = request.query.searchQuery
  let movieUrl = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${search}`
  let movieData = await axios.get(movieUrl);
  response.status(200).send(returnMovie(movieData));

}









app.listen(PORT, () => console.log(`listening on ${PORT}`))