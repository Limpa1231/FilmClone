const Api_Key  = "8c8e1a50-6322-4135-8875-5d40a5420d86";
const Api_PopularFilm = "https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=1   ";
const API_Search = "https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=";

getMovies(Api_PopularFilm);

async function getMovies(url) {
    const resp = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            "X-API-KEY": Api_Key,
        }
    });
    const respData = await resp.json();
    drawCard(respData);
}

function getClassMovieRating(rate) {
    if (rate > 8){
        return "green"
    }else if (rate < 5) {
        return "red"
    }else {
        return "orange"
    };
}

function drawCard(data){
    const movies = document.querySelector(".movies")

    //Очистка списка фильмов
    document.querySelector(".movies").innerHTML = "";     

    data.films.forEach(movie => {
        const movieElement = document.createElement("div");  
        movieElement.classList.add("movie");
        movieElement.innerHTML = `
        <div class="movie__cover-inner">
                <img src='${movie.posterUrlPreview}' alt="${movie.nameRu}" class = "movie__cover">
                <div class="movie__cover-dark"></div>
            </div>
        <div class="movie__info">
            <div class="movie__title">${movie.nameRu}</div>
            <div class="movie__category">${movie.genres.map((genre) => ` ${genre.genre}`)}</div>
            <div class="movie__average  movie__average--${getClassMovieRating(movie.rating)}">${movie.rating}</div>
        </div>`;
        movies.appendChild(movieElement);     
    });
}

const form = document.querySelector('form');
const search = document.querySelector('.header__search');

form.addEventListener('submit', (e) => {
    e.preventDefault();


    const apiSearchUrl = `${API_Search}${search.value}`
    if (search.value){
        getMovies(apiSearchUrl);

        search.value = "";
    }
})