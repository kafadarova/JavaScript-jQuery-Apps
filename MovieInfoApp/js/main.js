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
