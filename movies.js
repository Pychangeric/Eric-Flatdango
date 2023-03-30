fetch('http://localhost:3000/films')
        .then(response => response.json())
        .then(data => {
          const movieContainer = document.getElementById('movieContainer');
          data.forEach(film => {
            const listItem = document.createElement('li');
            listItem.textContent = film.title;
            listItem.addEventListener('click', () => showMovieDetails(film));
            movieContainer.appendChild(listItem);
          });
        });
 // Display details for selected movie
 function showMovieDetails(films) {
    const filmsDetails = document.getElementById('movieContainer');
    filmsDetails.innerHTML = `
      <img src="${films.poster}" alt="">
      <h2><strong>TITLE</strong>:${films.title}</h2>
      <p><strong>ID</strong>:${films.id}</p>
      <p><strong>RUNTIME</strong>:${films.runtime}</p>
      <p><strong>AVAILABLE TICKETS</strong>:${films.capacity-films.tickets_sold}</p>
        <p><strong>Showtime</strong>:${films.showtime}</p>
        <p><strong>CAPACITY</strong>:${films.capacity}</p>
        <p><strong>DESCRIPTION</strong>:${films.description}</p>
    `;
 }
    // Code for making a buy return button
  const returnButton = document.getElementById('return-button');
    returnButton.addEventListener('click', () => {
      const  returnButton= document.getElementById('showMovieDetails');
      showMovieDetails;
      returnButton.textContent = showMovieDetails; 
    });
