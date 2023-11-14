let userLogado = JSON.parse(localStorage.getItem('userLogado'));
let poster = document.querySelector('.movie');
let main = document.getElementById('main');

if(localStorage.getItem('token') == null){
    window.location.href= '../../index.html'
}

function sair(){
    localStorage.removeItem('token')
    localStorage.removeItem('userLogado')
    window.location.href= '../../index.html'
}

let movies = [];

const API_KEY = 'api_key=3b13d1c5fa5a243ae3eb4ce36a871a8a';

const IMG_URL = 'https://image.tmdb.org/t/p/w500/';
const BASE_URL = 'https://api.themoviedb.org/3/';
const LANGUAGE = '&language=pt-br'
const API_URL = BASE_URL + 'discover/tv?sort_by=popularity.desc&' + API_KEY + LANGUAGE;

fetch(API_URL)
    .then(respose => respose.json())
    .then(data =>{
        movies = data.results.slice(0,12)
    })

function Movie(){

    main.innerHTML = '';
    movies.forEach(movie => {
        console.log(movie.id)
        console.log(movie.original_name)

        const {original_name, poster_path, vote_average, overview} = movie
        const movieElement = document.createElement('div');
        movieElement.classList.add('movie');
        movieElement.innerHTML = `
            <div class="movie">
                <img class="capa" src="${IMG_URL+poster_path}" alt="${original_name}">
                    <div class="movieinfo">
                        <h3>${original_name}</h3>
                        <span class="green">${vote_average}</span>                
                    </div>
                <div class="overview">
                    ${overview}
                </div>
            </div>  
        `
        main.appendChild(movieElement);
    })
}