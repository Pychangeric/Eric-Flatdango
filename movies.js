document.addEventListener('DOMContentLoaded', () => {
  const APIURL = 'http://localhost:3000/films';
  const randomFilmContainer = document.getElementById('random-film-container');
  const filmSlider = document.getElementById('film-slider');
  const prevButton = document.getElementById('prev-button');
  const nextButton = document.getElementById('next-button');
  const modal = document.getElementById('modal');


  // Fetch films and display random film and film slider
  fetch(APIURL)
    .then(response => response.json())
    .then(data => {
      // Create a random film
      const randomFilm = data[Math.floor(Math.random() * data.length)];

      // Display the random film
      displayRandomFilm(randomFilm);

      // Display the film slider
      displayFilmSlider(data.filter(film => film.id !== randomFilm.id));
    })
    .catch(error => console.error(error));

  // Function to display the random film
  function displayRandomFilm(randomFilm) {
    const img = document.createElement('img');
    img.src = randomFilm.poster;
    img.alt = randomFilm.title + ' poster';
    randomFilmContainer.appendChild(img);

    // Listen for click event on the random film
    img.addEventListener('click', () => {
      displayModal(randomFilm);
    });
  }

  // Function to display the film slider
  function displayFilmSlider(films) {
    films.forEach(film => {
      const img = document.createElement('img');
      img.src = film.poster;
      img.alt = film.title + ' poster';
      img.dataset.id = film.id;
      filmSlider.appendChild(img);

      // Listen for click event on each film in the slider
      img.addEventListener('click', () => {
        fetchFilmDetails(film.id);
      });
    });

    // Handle slider navigation
    let currentIndex = 0;
    const filmWidth = 210; // Including margin
    const maxIndex = films.length - 1;

    prevButton.addEventListener('click', () => {
      if (currentIndex > 0) {
        currentIndex--;
        updateSliderPosition();
      }
    });

    nextButton.addEventListener('click', () => {
      if (currentIndex < maxIndex) {
        currentIndex++;
        updateSliderPosition();
      }
    });

    // Function to update slider position
    function updateSliderPosition() {
      const newPosition = -currentIndex * filmWidth;
      filmSlider.style.transform = `translateX(${newPosition}px)`;
    }
  }

  function closeModal() {
    modal.style.display = 'none';
  }

  // Function to fetch film details
  function fetchFilmDetails(filmId) {
    fetch(`http://localhost:3000/films/${filmId}`)
      .then(response => response.json())
      .then(movie => {
        displayModal(movie);
      })
      .catch(error => console.error(error));
  }

  // Function to display the modal
  function displayModal(movie) {
    modal.innerHTML = `
      <div class="modal-content">
        <span class="close" onclick="closeModal()">&times;</span>
        <h2>${movie.title}</h2>
        <img src="${movie.poster}" alt="${movie.title} poster" style="max-width: 300px;">
        <p><strong>Description:</strong> ${movie.description}<br></p>
        <p><strong>Showtime:</strong> ${movie.showtime}</p>
        <p><strong>Tickets Sold:</strong> ${movie.tickets_sold}</p>
        <p><strong>Capacity:</strong> ${movie.capacity}</p>
        <p><strong>Runtime:</strong> ${movie.runtime} min</p>
        <p><strong>Available Tickets:</strong> ${movie.capacity - movie.tickets_sold}</p>
      </div>
    `;
    modal.classList.add('modal'); // Add 'modal' class
    modal.style.display = 'block';
  }

  // Function to close the modal
  function closeModal() {
    modal.style.display = 'none';
  }
});
