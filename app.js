const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const output = document.getElementById('output');

searchButton.addEventListener('click', function(event) {
  searchMovie(event);
});

async function searchMovie() {
  const movieTitle = searchInput.value.trim();
  if (movieTitle === "") {
    return;
  }

  const apiKey = 'c611180b';
  const url = `https://www.omdbapi.com/?s=${encodeURIComponent(movieTitle)}&apikey=${apiKey}`;

    output.innerHTML = ""; 

    const response = await fetch(url);
    const data = await response.json();

    if (data.Response === "True") {
      const movies = data.Search;
      output.innerHTML = `
        <div class="movie-grid">
          ${movies.map(movie => `
            <div class="movie-card">
              <img class="movie-poster" src="${movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/200x300?text=No+Image"}" alt="${movie.Title}">
              <h3 class="movie-title">${movie.Title}</h3>
              <p class="movie-year">Year: ${movie.Year}</p>
            </div>
          `).join('')}
        </div>
      `;
    } else {
      output.innerHTML = `
        <div class="movie-not-found">
          <h2>No movies found for "<em>${movieTitle}</em>"</h2>
          <p>Please try a different keyword.</p>
        </div>
      `;
    } 
}

