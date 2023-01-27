// Variables
const apiKey = "ea353d7c0c3779d04f81ea662125dc84";
const endPoint = "https://api.themoviedb.org/3";
const imgPath = "https://image.tmdb.org/t/p/original";
const apiPath = {
    fetchGenres: `${endPoint}/genre/movie/list?api_key=${apiKey}`,
    fetchMovies: (id) =>
        `${endPoint}/discover/movie?api_key=${apiKey}&with_genres=${id}`,
};

// Functions

function init() {
    fetchAndBuildAllSections();
    sliderAuto();
}

function fetchAndBuildAllSections() {
    fetch(apiPath.fetchGenres)
        .then((response) => response.json())
        .then((response) => {
            const categories = response.genres;
            if (Array.isArray(categories) && categories.length) {
                categories.forEach((category) => {
                    fetchAndBuildMoviesSection(
                        apiPath.fetchMovies(category.id),
                        category.name
                    );
                });
            }
        })
        .catch((error) => console.log(error));
}

function fetchAndBuildMoviesSection(fetchUrl, categoryName) {
    fetch(fetchUrl)
        .then((response) => response.json())
        .then((response) => {
            console.log(response.results);
            const movies = response.results;
            if (Array.isArray(movies) && movies.length) {
                buildMoviesSection(movies, categoryName);
                // buildSliderSection(moviesList);
            }
        })
        .catch((error) => console.log(error));
}

function buildMoviesSection(moviesList, categoryName) {
    const moviesContainer = document.getElementById("movies-container");

    const moviesListHtml = moviesList
        .map((movie) => {
            return `
            <div class="movie-card" id="movie-card">
                <img class="movie-item" src="${imgPath}/${movie.backdrop_path}" alt="" />
                <h4 class="movie-name" id="movie-name">${movie.original_title}</h4>
                
            </div>
        `;
        })
        .join(" ");

    const movieSectionHtml = `
    <h3 class="section-heading">${categoryName}</h3>
    <div class="movies-row">
        ${moviesListHtml}
    </div>
    `;

    const div = document.createElement("div");
    div.className = "movies-section";
    div.innerHTML = movieSectionHtml;

    moviesContainer.append(div);
}

function sliderAuto() {
    let counter = 1;
    setInterval(() => {
        const sliderRadio = document.getElementById("radio" + counter);
        sliderRadio.setAttribute("checked", "");
        counter++;
        if (counter > 6) {
            counter = 1;
            document.getElementById("radio1").removeAttribute("checked", "");
        }
    }, 5000);
}

{
    /* <div class="movie-card" id="movie-card">
    <img
        class="movie-item"
        src="https://m.media-amazon.com/images/S/pv-target-images/c2da447cc93a27116ded97e07d3f1d207916c41c516305c6337fc1533a0e6abd._UR1920,1080_SX356_FMjpg_.jpg"
        alt=""
    />
    <h4 class="movie-name" id="movie-name">
        Money Mafia
    </h4>
    <p class="movie-info" id="movie-info"></p>
</div>; */
}
// }

function showinfo() {
    const movieCard = document.getElementById("movie-card");
    const movieName = document.getElementById("movie-name");
    const movieInfo = document.getElementById("movie-info");
    // let flag = false;
    // movieName.style.display = "none";
    // movieInfo.style.display = "none";
    // movieCard.addEventListener("mouseover", () => {
    // movieName.style.display = "block";
    // movieInfo.style.display = "block";
    //     flag = true;
    // });
    // // if (flag == true) {
    // movieName.style.display = "none";
    // movieInfo.style.display = "none";
    // }
    if (movieCard.onmouseover == true) {
        movieName.style.display = "block";
        movieInfo.style.display = "block";
    } else {
        movieName.style.display = "none";
        movieInfo.style.display = "none";
    }
}

//////////////////////////////////////

window.addEventListener("load", () => {
    init();
    // showinfo();
});
