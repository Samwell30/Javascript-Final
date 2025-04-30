let currentMovies = []; // added this var to hold the movie data

  async function searchMovie() {
    const searchInput = document.getElementById('searchInput');
    const output = document.getElementById('output');
    const loading = document.getElementById('loading');
    const movieTitle = searchInput.value.trim();

    loading.style.display = 'block';
    output.innerHTML = "";

    const response = await fetch(`https://www.omdbapi.com/?s=${(movieTitle)}&apikey=c611180b`);
    const data = await response.json();

    setTimeout(() => {
      loading.style.display = 'none';

      if (data.Response === "True") {
        currentMovies = data.Search; 
        renderMovies(currentMovies);
      } else {
        currentMovies = [];
        output.innerHTML = `<p>No movies found for "<em>${movieTitle}</em>".</p>`;
      }
    }, 1000);
}

function renderMovies(movies) {
    const output = document.getElementById('output');
    output.innerHTML = `
      <div class="movie-section">
        <div class="sort-container">
          <select id="filter" onchange="sortMovies()">
            <option value="" disabled selected>Sort</option>
            <option value="LOW_TO_HIGH">Oldest to Newest</option>
            <option value="HIGH_TO_LOW">Newest to Oldest</option>
          </select>
        </div>
        <div class="movie-grid">
          ${movies.map(movie => `
            <div class="movie-card">
              <img src="${movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/200x300?text=No+Image"}">
              <h3 class="movie-title">${movie.Title}</h3>
              <p class="movie-year">Year: ${movie.Year}</p>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }
  
  function sortMovies() {
    const filter = document.getElementById('filter').value;
    let sortedMovies = currentMovies.slice();

    if (filter === "LOW_TO_HIGH") {
      sortedMovies.sort((a, b) => (a.Year) - (b.Year));
    } else if (filter === "HIGH_TO_LOW") {
      sortedMovies.sort((a, b) => (b.Year) - (a.Year));
    }

    renderMovies(sortedMovies);
}

  