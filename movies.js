const APIURL = 'http://localhost:3000/films';
const IMGPATH = "./images/";
const main = document.getElementById("main");
const form = document.getElementById("form");
const searchForm = document.getElementById("searchForm");

let ticketsAvailable;


    // Handle ticket purchase button click
    const buyTicketButton = document.getElementById('buy-ticket-main');
buyTicketButton.addEventListener('click', () => {
      if (ticketsAvailable = 0) {
        alert('Sorry, this showing is sold out!');
      } else {
        alert('ticket bought!');
        // Decrement tickets sold and update server
        data.tickets_sold++;
        fetch(`http://localhost:3000/films/${data.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(updatedData => {
          // Calculate available tickets and update UI
          const ticketsAvailable = updatedData.capacity - updatedData.tickets_sold;
          const ticketsAvailableElement = document.querySelector('#main p:last-child');
          ticketsAvailableElement.textContent = `Available Tickets: ${ticketsAvailable};
          buyTicketButton.disabled = true;
          `;
        });
      }
    });


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
    moviesList.appendChild(li);
  });
  main.appendChild(moviesList);
}