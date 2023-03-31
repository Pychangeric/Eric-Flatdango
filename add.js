const APIURL = 'http://localhost:3000/films';
const IMGPATH = "./images/";

const addMovieForm = document.getElementById("add-movie-form");
const movieList = document.getElementById("movie-list");

// Function to add a movie to the movie list
function addMovie(title, poster) {
  const movie = {title: title, poster: poster};

  // Send POST request to server to add movie to database
  fetch(APIURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(movie)
  })
  .then(response => response.json())
  .then(data => {
    // Display the updated movie list
    displayMovies(data);
  })
  .catch(error => console.error(error));
}

// Function to display movies in the movie list
function displayMovies(movies) {
  movieList.innerHTML = "";
  movies.forEach((movie) => {
    const li = document.createElement("li");
    li.textContent = movie.title;

    // Display movie poster
    const img = document.createElement("img");
    img.src = IMGPATH + movie.poster;
    img.alt = movie.title;
    img.classList.add("movie-poster");
    li.appendChild(img);

    movieList.appendChild(li);
  });
}

// Event listener for add movie form
addMovieForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const title = document.getElementById("movie-title").value;
  const poster = document.getElementById("movie-poster").value;
  addMovie(title, poster);
  // Reset the form
  addMovieForm.reset();
});

// Initial display of all movies
fetch(APIURL)
  .then(response => response.json())
  .then(data => displayMovies(data))
  .catch(error => console.error(error));