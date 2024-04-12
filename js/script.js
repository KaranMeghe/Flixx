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

  displayBackgroundImage("movie", response.backdrop_path);

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

// TV SHOWS Details
async function showTvDetails() {
  const showId = window.location.search.slice(1);
  console.log(showId);

  const showResponse = await fetchAPIDATA(`/tv/${showId}`);
  const div = document.createElement("div");

  displayBackgroundImage("show", showResponse.backdrop_path);

  div.innerHTML = `
  <div class= "details-top">
  <div>
    <img
      src="https://image.tmdb.org/t/p/w500${showResponse.poster_path}"
      class="card-img-top"
      alt="Show Name"
    />
  </div>
  <div>
    <h2>${showResponse.name}</h2>
    <p>
      <i class="fas fa-star text-primary"></i>
     ${showResponse.vote_average} / 10
    </p>
    <p class="text-muted">Release Date: ${showResponse.first_air_date}</p>
    <p>
      ${showResponse.overview}
    </p>
    <h5>Genres</h5>
    <ul class="list-group">
    ${showResponse.genres.map((gen) => `<li>${gen.name}</li>`).join("")}
    </ul>
    <a href=${
      showResponse.homepage
    } target="_blank" class="btn">Visit Show Homepage</a>
  </div>
</div>
<div class="details-bottom">
  <h2>Show Info</h2>
  <ul>
    <li><span class="text-secondary">Number Of Episodes:</span> ${
      showResponse.number_of_episodes
    }</li>
    <li>
      <span class="text-secondary">Last Episode To Air:</span> ${
        showResponse.last_air_date
      }
    </li>
    <li><span class="text-secondary">Status:</span> ${showResponse.status}</li>
  </ul>
  <h4>Production Companies</h4>
  <div class="list-group">${showResponse.production_companies
    .map((company) => `<span>${company.name}</span>`)
    .join(", ")}</div>
</div>
</div>`;

  document.querySelector("#show-details").appendChild(div);
}

// Display Background Image
function displayBackgroundImage(type, backgroundPath) {
  const overlayDiv = document.createElement("div");
  overlayDiv.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${backgroundPath})`;
  overlayDiv.style.backgroundSize = "cover";
  overlayDiv.style.backgroundPosition = "center";
  overlayDiv.style.backgroundRepeat = "no-repeat";
  overlayDiv.style.height = "100vh";
  overlayDiv.style.width = "100vw";
  overlayDiv.style.position = "absolute";
  overlayDiv.style.top = "0";
  overlayDiv.style.left = "0";
  overlayDiv.style.zIndex = "-1";
  overlayDiv.style.opacity = "0.1";

  if (type === "movie") {
    return document.querySelector("#movie-details").appendChild(overlayDiv);
  } else {
    return document.querySelector("#show-details").appendChild(overlayDiv);
  }
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

// Display Slider Movies
async function displaySlider() {
  const { results } = await fetchAPIDATA(`movie/now_playing`);
  console.log(results);

  results.forEach((result) => {
    const div = document.createElement("div");
    div.classList.add("swiper-slide");

    div.innerHTML = `
    <a href="movie-details.html?${result.id}">
      <img src="https://image.tmdb.org/t/p/w500${result.poster_path}" alt="Movie Title" />
    </a>
    <h4 class="swiper-rating">
      <i class="fas fa-star text-secondary"></i>
      ${result.vote_average} / 10
    </h4>`;

    document.querySelector(".swiper-wrapper").appendChild(div);
    initSwiper();
  });
}

// init Swiper
function initSwiper() {
  const swiper = new Swiper(".swiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    freeMode: true,
    loop: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    breakpoints: {
      500: {
        slidesPerView: 2,
      },
      700: {
        slidesPerView: 3,
      },
      1200: {
        slidesPerView: 4,
      },
    },
  });
}

// Init App
function init() {
  switch (global.currentPage) {
    case "/":
    case "/index.html":
      displaySlider();
      displayPopularMovies();
      break;

    case "/shows.html":
      displayPopularShows();
      break;

    case "/tv-details.html":
      showTvDetails();
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
