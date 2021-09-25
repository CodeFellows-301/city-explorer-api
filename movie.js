const axios = require('axios')

class Movie {
  constructor(movieData) {
    this.title = movieData.title
    this.overview = movieData.overview
    this.average_votes = movieData.vote_average
    this.total_votes = movieData.vote_count
    this.popularity = movieData.popularity
    this.released_on = movieData.release_date
    this.image_url = "https://image.tmdb.org/t/p/w500"+movieData.poster_path
  }
}

function returnMovie(movieInfo){
  const movies = movieInfo.data.results.map(movie => {
    return new Movie(movie)
  })
    return movies;
}

async function movieDB(request,response){
  let search = request.query.searchQuery
  let movieUrl = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${search}`
  let movieData = await axios.get(movieUrl);
  response.status(200).send(returnMovie(movieData));

}

module.exports={movieDB}
