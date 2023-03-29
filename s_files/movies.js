const movieId = 1; // replace with the actual movie ID
const theaterId = 2; // replace with the actual theater ID

const filmDataEndpoint = `http://localhost:3000/films/${movieId}?theater=${theaterId}`;

// make a GET request to retrieve the film data
fetch(filmDataEndpoint)
  .then(response => response.json())
  .then(data => {
    // calculate the number of available tickets
    const availableTickets = data.theater.capacity - data.tickets_sold;
    
    // display the movie's details
    const movieDetails = `
      <div>
        <img src="${data.poster}" alt="${data.title} poster" />
        <h2>${data.title}</h2>
        <p>Runtime: ${data.runtime} minutes</p>
        <p>Showtime: ${data.showtime}</p>
        <p>Available Tickets: ${availableTickets}</p>
      </div>
    `;
    
    // add the movie details to the DOM
    const movieContainer = document.getElementById("movie-container");
    movieContainer.innerHTML = movieDetails;
  })
  .catch(error => console.error(error));