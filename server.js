`use strict`

require('dotenv').config();
const express = require('express')
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;
const axios = require('axios');
const getWeather = require('./weather')
const getMovies = require('./movie')


app.use(cors());
app.get('/weather', getWeather.weatherBitIoCall)
app.get('/movie', getMovies.movieDB)



app.listen(PORT, () => console.log(`listening on ${PORT}`))