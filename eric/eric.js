// Get the movie details and update the UI
fetch('/films/1')
  .then(response => response.json())
  .then(movie => {
    const poster = document.getElementById('poster');
    poster.src = movie.poster;
    const title = document.getElementById('title');
    title.textContent = movie.title;
    const runtime = document.getElementById('runtime');
    runtime.textContent = `${movie.runtime} mins`;
    const showtime = document.getElementById('showtime');
    showtime.textContent = movie.showtime;
    const availableTickets = document.getElementById('available-tickets');
    const ticketsLeft = movie.capacity - movie.tickets_sold;
    availableTickets.textContent = ticketsLeft;
  });

// Get the list of movies and update the UI
fetch('/films')
  .then(response => response.json())
  .then(movies => {
    const filmsList = document.getElementById('films');
    filmsList.innerHTML = '';
    movies.forEach(movie => {
      const listItem = document.createElement('li');
      listItem.classList.add('film', 'item');
      listItem.textContent = movie.title;
      filmsList.appendChild(listItem);
    });
  });

// Buy a ticket for the movie
const buyButton = document.getElementById('buy-ticket');
buyButton.addEventListener('click', () => {
  const availableTickets = document.getElementById('available-tickets');
  let ticketsLeft = parseInt(availableTickets.textContent);
  if (ticketsLeft > 0) {
    ticketsLeft--;
    availableTickets.textContent = ticketsLeft;
  } else {
    alert('Sorry, all tickets sold out!');
  }
});