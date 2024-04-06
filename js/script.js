const global = {
  currentPage: window.location.pathname,
};

console.log(global.currentPage);

// FETCH DATA FROM TMDB API
async function fetchAPIDATA(endpoint) {
  const API_KEY = "caf9ccaf5ef2d683e938e76c03c63b3e";
  const API_URL = "https://api.themoviedb.org/3/";

  try {
    const response = await fetch(
      `${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`
    );

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
}

// Display Popular TV SHOWS
async function displayPopularShows() {
  const { results } = await fetchAPIDATA("tv/popular");

  results.forEach((tvShow) => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `<a href="tv-details.html?${tvShow.id}">
    ${
      tvShow.poster_path
        ? `<img src="https://image.tmdb.org/t/p/w500${tvShow.poster_path}" class="card-img-top" alt="Show Title" />`
        : "No poster available"
    }
  </a>
  <div class="card-body">
    <h5 class="card-title">${tvShow.name}</h5>
    <p class="card-text">
      <small class="text-muted">Aired: ${tvShow.first_air_date}</small>
    </p>
  </div>`;
    document.querySelector("#popular-shows").appendChild(div);
  });
}

// Display Popular Movies
async function displayPopularMovies() {
  const { results } = await fetchAPIDATA("movie/popular");
  console.log(results);

  results.forEach((movie) => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `<a href="movie-details.html?${movie.id}">
    ${
      movie.poster_path
        ? `<img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="card-img-top" alt="Movie Title" />`
        : "No poster available"
    }
</a>

  <div class="card-body">
    <h5 class="card-title">${movie.title}</h5>
    <p class="card-text">
      <small class="text-muted">Release: ${movie.release_date}</small>
    </p>
  </div>`;
    document.querySelector("#popular-movies").appendChild(div);
  });
}

// Highlight active link
function highlightActiveLink() {
  const navLinks = document.querySelectorAll(".nav-link");

  navLinks.forEach((link) => {
    if (link.getAttribute("href") === global.currentPage) {
      link.classList.add("active");
    }
  });
}

// Init App
function init() {
  switch (global.currentPage) {
    case "/":
    case "/index.html":
      displayPopularMovies();
      break;

    case "/shows.html":
      displayPopularShows();
      break;

    case "/tv-details.html":
      console.log("Tv Show Details");
      break;

    case "/movie-details.html":
      console.log("Movie Details");
      break;

    case "/search.html":
      console.log("Search");
      break;
  }
  highlightActiveLink();
}

document.addEventListener("DOMContentLoaded", init);
