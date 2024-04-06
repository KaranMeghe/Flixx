const global = {
  currentPage: window.location.pathname,
};

console.log(global.currentPage);

// FETCH DATA FROM TMDB API
async function fetchAPIDATA(endpoint) {
  const API_KEY = "caf9ccaf5ef2d683e938e76c03c63b3e";
  const API_URL = "https://api.themoviedb.org/3/";

  try {
    showSpinner();
    const response = await fetch(
      `${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`
    );

    const data = await response.json();
    console.log(data);
    hideSpinner();
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

// Movie Details
async function movieDetails() {
  const movieId = window.location.search.slice(1);
  console.log(movieId);

  const response = await fetchAPIDATA(`movie/${movieId}`);
  console.log(response);

  const div = document.createElement("div");

  div.innerHTML = `<div class="details-top">
  <div>
        <img
            src="https://image.tmdb.org/t/p/w500${response.poster_path}"
            class="card-img-top"
            alt="Movie Title"
        />
 </div>
    <div>
        <h2>${response.title}</h2>
            <p>
                <i class="fas fa-star text-primary"></i>
            ${response.vote_average} / 10
            </p>
            <p class="text-muted">Release Date: ${response.release_date}</p>
            <p>
                ${response.overview}
            </p>
            <h5>Genres</h5>
        <ul class="list-group">
        ${response.genres.map((gen) => `<li>${gen.name}</li>`).join("")}
        </ul>
        <a href="${
          response.homepage
        }" target="_blank" class="btn">Visit Movie Homepage</a>
    </div>
  </div>

 <div class="details-bottom">
        <h2>Movie Info</h2>
            <ul>
            <li><span class="text-secondary">Budget:</span> $${
              response.budget
            }</li>
            <li><span class="text-secondary">Revenue:</span> $2,000,000</li>
            <li><span class="text-secondary">Runtime:</span> ${
              response.runtime
            } minutes</li>
            <li><span class="text-secondary">Status:</span> Released</li>
            </ul>
            <h4>Production Companies</h4>

            <div class="list-group">
            ${response.production_companies
              .map((company) => `<span>${company.name}</span>`)
              .join(", ")}
            </div>

    </div>
    </div>`;

  document.querySelector("#movie-details").appendChild(div);
}

// Show Spinner
function showSpinner() {
  return document.querySelector(".spinner").classList.add("show");
}
// Hide Spinner
function hideSpinner() {
  return document.querySelector(".spinner").classList.remove("show");
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
      movieDetails();
      break;

    case "/search.html":
      console.log("Search");
      break;
  }
  highlightActiveLink();
}

document.addEventListener("DOMContentLoaded", init);
