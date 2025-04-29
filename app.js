async function searchMovie() {
    const searchInput = document.getElementById('searchInput');
    const output = document.getElementById('output');
    const loading = document.getElementById('loading');
    const movieTitle = searchInput.value.trim();
  
    if (movieTitle === "") {
      output.innerHTML = "<p>Please enter a movie title.</p>";
      return;
    }
  
    loading.style.display = 'block';
    output.innerHTML = "";
  
      const response = await fetch(`https://www.omdbapi.com/?s=${encodeURIComponent(movieTitle)}&apikey=c611180b`);
      const data = await response.json();
  
      setTimeout(() => {
        loading.style.display = 'none';
  
        if (data.Response === "True") {
          output.innerHTML = `
            <div class="movie-grid">
              ${data.Search.map(movie => `
                <div class="movie-card">
                  <img src="${movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/200x300?text=No+Image"}">
                  <h3>${movie.Title}</h3>
                  <p>Year: ${movie.Year}</p>
                </div>
              `).join('')}
            </div>
          `;
        } else {
          output.innerHTML = `<p>No movies found for "<em>${movieTitle}</em>".</p>`;
        }
        loading.style.display = 'none';
      }, 1000);    
  }
  