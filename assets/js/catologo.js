let userLogado = JSON.parse(localStorage.getItem('userLogado'));
let poster = document.querySelector('.movie');
let destaque = document.getElementById('destaque');
let top_rated = document.getElementById('top_rated');
let lancamentos = document.getElementById('lancamentos');
//let top_rated = document.getElementById('top_rated');

if(localStorage.getItem('token') == null){
    window.location.href= '../../index.html'
}

function sair(){
    localStorage.removeItem('token')
    localStorage.removeItem('userLogado')
    window.location.href= '../../index.html'
}

let movies = [];

const API_KEY = '';

const IMG_URL = 'https://image.tmdb.org/t/p/w500/';
const BASE_URL = 'https://api.themoviedb.org/3/discover/movie?api_key=3b13d1c5fa5a243ae3eb4ce36a871a8a';
const LANGUAGE = '&language=pt-BR';

const TOP_POPULARITY = '&sort_by=popularity.desc';
const TOP_RATED = '&sort_by=vote_average.desc';

const BR_MOVIES = BASE_URL + TOP_POPULARITY + '&region=BR' + LANGUAGE;
const FUTUROS =  BASE_URL + '&language=pt-BR&page=1&include_adult=true&year=2024&query=mm';
const API_URL = BASE_URL + TOP_RATED  + LANGUAGE + '&region=BR';



destaques();
lancamentosFuturos();
topRated();


// busca os filmes em destaque para exibir no catalofo
function destaques(){

    fetch(BR_MOVIES)
            .then(respose => respose.json())
            .then(data =>{
                movies = data.results.slice(0,6)
                
                destaque.innerHTML = '';
                movies.forEach(movie => {

                    const {title, poster_path, vote_average, overview} = movie
                    const movieElement = document.createElement('div');

                    movieElement.classList.add('movie');
                    movieElement.innerHTML = `
                        <div class="movie">
                            <img class="capa" src="${IMG_URL+poster_path}" alt="${title}">
                                <div class="movieinfo">
                                    <h3>${title}</h3>
                                    <span class="green">
                                        <img class="star" src="../img/Star.svg">
                                        ${vote_average}
                                    </span>                
                                </div>
                            <div class="overview">
                                ${overview}
                            </div>
                        </div>  
                    `
                    destaque.appendChild(movieElement);
                })
            }
    );
    
}

function lancamentosFuturos(){

    
        fetch(FUTUROS)
            .then(respose => respose.json())
            .then(data =>{
                movies = data.results.slice(0,6)
                
                
                lancamentos.innerHTML = '';
                movies.forEach(movie => {

                    const {title, poster_path, vote_average, overview} = movie
                    const movieElement = document.createElement('div');

                    movieElement.classList.add('movie');
                    movieElement.innerHTML = `
                        <div class="movie">
                            <img class="capa" src="${IMG_URL+poster_path}" alt="${title}">
                                <div class="movieinfo">
                                    <h3>${title}</h3>
                                    <span class="green">
                                        <img class="star" src="../img/Star.svg">
                                        ${vote_average}
                                    </span>                
                                </div>
                            <div class="overview">
                                ${overview}
                            </div>
                        </div>  
                    `
                    lancamentos.appendChild(movieElement);
                })
            }
        );

}

function topRated(){

    fetch(API_URL)
        .then(respose => respose.json())
        .then(data =>{
            movies = data.results.slice(0,6)

            console.log(movies);
            top_rated.innerHTML = '';
            movies.forEach(movie => {

                const {title, poster_path, vote_average, overview} = movie
                const movieElement = document.createElement('div');

                movieElement.classList.add('movie');
                movieElement.innerHTML = `
                    <div class="movie">
                        <img class="capa" src="${IMG_URL+poster_path}" alt="${title}">
                            <div class="movieinfo">
                                <h3>${title}</h3>
                                <span class="green">
                                    <img class="star" src="../img/Star.svg">
                                    ${vote_average}
                                </span>                
                            </div>
                        <div class="overview">
                            ${overview}
                        </div>
                    </div>  
                `
                top_rated.appendChild(movieElement);
            })
        }
    );

    
}