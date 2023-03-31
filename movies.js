const APIURL = 'http://localhost:3000/films';
const IMGPATH = "./images/";
const main = document.getElementById("main");
const form = document.getElementById("form");
const searchForm = document.getElementById("searchForm");

// Get movies based on search term
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const searchTerm = document.getElementById("search,movie.poster").value;
  fetch(`${APIURL}?q=${searchTerm}`)
    .then((response) => response.json())
    .then((data) => {
      const movies = data.filter((movie) =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      displayMovies(movies);
    })
    .catch((error) => console.error(error));
});

// Display movies in the main section
function displayMovies(movies) {
  main.innerHTML = "";
  const moviesList = document.createElement("ul");
  movies.forEach((movie) => {
    const li = document.createElement("li");
    li.textContent = movie.title;
    li.dataset.id = movie.id;

    // Display movie poster
    const img = document.createElement("img");
    img.src = IMGPATH + movie.poster;
    img.alt = movie.title;
    img.classList.add("movie-poster");
    li.appendChild(img);

    // Display movie information
    const movieDetails = document.createElement("div");
    movieDetails.classList.add("movie-details");

    // Display available tickets
    const ticketsAvailable = document.createElement("p");
    ticketsAvailable.textContent = `Available Tickets: ${movie.capacity - movie.tickets_sold}`;
    movieDetails.appendChild(ticketsAvailable);

    // Display buy ticket button
    const buyTicketButton = document.createElement("button");
    buyTicketButton.textContent = "Buy Ticket";
    buyTicketButton.classList.add("buy-ticket-button");
    buyTicketButton.addEventListener("click", () => {
      if (movie.tickets_sold >= movie.capacity) {
        alert('Sorry, this showing is sold out!');
      } else {
        alert('Ticket bought!');
        // Decrement tickets available and increment tickets sold
        movie.tickets_sold++;
        const ticketsAvailableElement = li.querySelector(".movie-details p");
        ticketsAvailableElement.textContent = `Available Tickets: ${movie.capacity - movie.tickets_sold}`;

        // Disable buy ticket button
        buyTicketButton.disabled = true;

        // Update server
        fetch(`${APIURL}/${movie.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(movie)
        })
        .then(() => {
          // Refresh movie list to show updated information
          fetch(APIURL)
            .then(response => response.json())
            .then(data => displayMovies(data))
            .catch(error => console.error(error));
        })
        .catch(error => console.error(error));
      }
    });
    movieDetails.appendChild(buyTicketButton);

    li.appendChild(movieDetails);

    moviesList.appendChild(li);
  });
  main.appendChild(moviesList);
}

// Initial display of all movies
fetch(APIURL)
  .then(response => response.json())
  .then(data => displayMovies(data))
  .catch(error => console.error(error));