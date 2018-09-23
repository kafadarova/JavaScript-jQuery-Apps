$(document).ready(() => {
  // On Submit event (pass the event as a parameter e)
  $('#searchForm').on('submit', (e) => {
    // Store what we searched in a variable
    let searchText = $('#searchText').val();
    getMovies(searchText);
    // Stop the form from actually submitting on a file
    e.preventDefault();
  });
});

// Make request to a API and search for movies and than display the result in the main.html
function getMovies(searchText) {
  // Make a request to the API with Axios
  axios.get('http://www.omdbapi.com/?apikey=4568cca1&s=' + searchText)
  // Return a promise
    .then((response) => {
      console.log(response);
      let movies = response.data.Search;
      let output = '';
      // Use jQuery and loop through each movie
      $.each(movies, (index, movie) => {
        output += `
        <div class="col-md-3">
          <div class="well text-center">
           <img src="${movie.Poster}">
            <h5>${movie.Title}</h5>
            <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="#">Movie Details</a>
          </div>
        </div>
        `;
      });
      // Change the html code in the div with the ID movies
      $('#movies').html(output);
    })
    .catch((err) =>{
      console.log(err);
    });
}

function movieSelected(id){
  // Clear out when the browser is closed
  // Store the movie id in the sessionStorage
  sessionStorage.setItem('movieId', id);
  // Change location and go to the single movie page
  window.location = 'movie.html';
  return false;
}

function getMovie() {
  // Retrive the movieId from the sessionStorage
  let movieId = sessionStorage.getItem('movieId');

  axios.get('http://www.omdbapi.com/?apikey=4568cca1&i=' + movieId)
  // Return a promise
    .then((response) => {
      console.log(response);
      let movie = response.data;

      let output = `
      <div class="row">
        <div class="col-md-4">
            <img src="${movie.Poster}" class="thumbnail">
        </div>
        <div class="col-md-8">
        <h5>${movie.Title}</h5>
          <ul class="list-group">
            <li class="list-group-item"><strong>Genre:</strong> ${movie.Genre}</li>
            <li class="list-group-item"><strong>Released:</strong> ${movie.Released}</li>
            <li class="list-group-item"><strong>Rated:</strong> ${movie.Rated}</li>
            <li class="list-group-item"><strong>IMDB Rating:</strong> ${movie.imdbRating}</li>
            <li class="list-group-item"><strong>Writer:</strong> ${movie.Writer}</li>
            <li class="list-group-item"><strong>Actors:</strong> ${movie.Actors}</li>
          </ul>
        </div>
      </div>
      <div class="row">
        <div class="well">
        <h3>Plot</h3>
        ${movie.Plot}
          <hr>
        <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary">View IMDB</a>
        <a href="index.html" class="btn btn-default">Go Back To Search</a>
        </div>
      </div>
      `;

    $('#movie').html(output);
        })
    .catch((err) =>{
      console.log(err);
    });
}
