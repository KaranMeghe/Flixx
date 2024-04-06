const global = {
  currentPage: window.location.pathname,
};

console.log(global.currentPage);

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
      console.log("Home");
      break;

    case "/shows.html":
      console.log("Tv Shows");
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
