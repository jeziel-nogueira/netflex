let userLogado = JSON.parse(localStorage.getItem('userLogado'));
let populares = document.getElementById('populares');
let lancamentos = document.getElementById('lancamentos');
let emAlta = document.getElementById('emAlta');
let poster1 = document.getElementById("carousel_Img1");
let poster2 = document.getElementById("carousel_Img2");
let poster3 = document.getElementById("carousel_Img3");
let carousel_Title1 = document.getElementById("carousel_Title1");
let carousel_Title2 = document.getElementById("carousel_Title2");
let carousel_Title3 = document.getElementById("carousel_Title3");
var Exit = document.getElementById('exit');


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
const LANGUAGE = '&language=pt-br';

const CAROUSEL = 'https://api.themoviedb.org/3/trending/movie/day?'+ API_KEY + LANGUAGE;
const NOWPLAYING =  'https://api.themoviedb.org/3/movie/now_playing?' + API_KEY + LANGUAGE;
const POPULAR = 'https://api.themoviedb.org/3/movie/popular?' + API_KEY + LANGUAGE;
const UPCOMING = 'https://api.themoviedb.org/3/movie/upcoming?' + API_KEY + LANGUAGE;

let lista = [];

topMovie();
lancamentosFuturos();
nowPlaying();
loadPosterToCarousel();

function loadPosterToCarousel(){

    fetch(CAROUSEL)
        .then(respose => respose.json())
        .then(data =>{
            movies = data.results.slice(0,6)
            movies.forEach(movie => {
                lista.push(movie);});

            poster1.src = IMG_URL+ movies[1].backdrop_path;
            poster1.onclick = function(){console.log(loadMovie(movies[1].id))};
            carousel_Title1.textContent = movies[1].title;

            poster2.src = IMG_URL+ movies[2].backdrop_path;
            poster2.onclick = function(){console.log(loadMovie(movies[2].id))};
            carousel_Title2.textContent = movies[2].title;

            poster3.src = IMG_URL+ movies[3].backdrop_path;
            poster3.onclick = function(){console.log(loadMovie(movies[3].id))};
            carousel_Title3.textContent = movies[3].title;

            let timer = '';
            
        }
    );
}


function topMovie(){

    
    fetch(POPULAR)
        .then(respose => respose.json())
        .then(data =>{
            movies = data.results.slice(0,6)
            
            //poster1.src=IMG_URL+ data[1].poster_path;
            
            populares.innerHTML = '';
            movies.forEach(movie => {
                lista.push(movie);
                const {id, title, poster_path, vote_average, overview} = movie
                const movieElement = document.createElement('div');

                movieElement.classList.add('movie');
                movieElement.innerHTML = `
                    <div class="movie">
                        <img class="capa" src="${IMG_URL+poster_path}" alt="${title}"  onClick="loadMovie(${id})">
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
                populares.appendChild(movieElement);
            })
        }
    );
}


function lancamentosFuturos(){

    
    fetch(UPCOMING)
        .then(respose => respose.json())
        .then(data =>{
            movies = data.results.slice(0,6)
            
            
            lancamentos.innerHTML = '';
            movies.forEach(movie => {
                lista.push(movie);
                const {id, title, poster_path, vote_average, overview} = movie
                const movieElement = document.createElement('div');

                movieElement.classList.add('movie');
                movieElement.innerHTML = `
                    <div class="movie">
                        <img class="capa" src="${IMG_URL+poster_path}" alt="${title}"  onClick="loadMovie(${id})">
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

function nowPlaying(){

    
    fetch(NOWPLAYING)
        .then(respose => respose.json())
        .then(data =>{
            movies = data.results.slice(0,6)
            
            
            emAlta.innerHTML = '';
            movies.forEach(movie => {
                lista.push(movie);
                const {id, title, poster_path, vote_average, overview} = movie
                const movieElement = document.createElement('div');

                movieElement.classList.add('movie');
                movieElement.innerHTML = `
                    <div class="movie">
                        <img class="capa" src="${IMG_URL+poster_path}" alt="${title}"  onClick="loadMovie(${id})">
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
                emAlta.appendChild(movieElement);
            })
        }
    );
}

function loadMovie(val){
    lista.forEach(item =>{
        if(item.id == val){
            localStorage.setItem('movieId', JSON.stringify(item));
        }
    })
    window.location.href = "./movieDetail.html";
    
}

function buscar(){
    let val = document.getElementById('search');    
    if(val.value != ''){
        localStorage.setItem('busca', val.value);    
        console.log(val.value);
        window.location.href = "./results.html";
    }    
}

Exit.onclick = function(){
    sair()
}