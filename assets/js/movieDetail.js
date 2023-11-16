let setMovie = document.getElementById('movieDetail');
let sugestoes = document.getElementById('sugeridos');

const API_KEY = 'api_key=3b13d1c5fa5a243ae3eb4ce36a871a8a';
const IMG_URL = 'https://image.tmdb.org/t/p/w500/';
const ID_URL = 'https://api.themoviedb.org/3/find/'
const LANGUAGE = '&language=pt-BR';

const BASE_URL = 'https://api.themoviedb.org/3/find/api_key=3b13d1c5fa5a243ae3eb4ce36a871a8a';
const FUTUROS =  'https://api.themoviedb.org/3/discover/movie?api_key=3b13d1c5fa5a243ae3eb4ce36a871a8a' + '&page=1&include_adult=true&year=2024&query=mm';

let userLogado = JSON.parse(localStorage.getItem('userLogado'));

if(localStorage.getItem('token') == null){
   // window.location.href= '../../index.html'
}

if(localStorage.getItem('movieId') != null){
    console.log(localStorage.getItem('movieId'));
    if(localStorage.getItem('movieId') == ''){
        console.log('vazio msm');
        localStorage.removeItem('movieId');
    }
    else{
        getMovieInfo();
        localStorage.removeItem('busca');
    }
}

function sair(){
    localStorage.removeItem('token')
    localStorage.removeItem('userLogado')
    window.location.href= '../../index.html'
}


function buscar(){
    let val = document.querySelector('.search')
    if(val.value != ''){
        localStorage.setItem('busca', val.value);    
        console.log(val.value);

        window.location.href = "./results.html";
    }
}


function getMovieInfo(){
    let movie = JSON.parse(localStorage.getItem('movieId'));
    console.log(movie.id)
    console.log(movie.title)

    img_path = IMG_URL + movie.backdrop_path;
    if(movie.backdrop_path == null){
        img_path =IMG_URL + movie.poster_path;
    }

    setMovie.innerHTML = '';
    const movieElement = document.createElement('div');

                movieElement.classList.add('detailed');
                movieElement.innerHTML = `
                <div class="imgPoster" >
                    <img src="${img_path}" alt="">
                        <div class="details">
                            <h3 class="movieTitle">
                                ${movie.title}
                            </h3>                            
                            <p class="movieRate">
                                <img class="starDetail" src="../img/Star.svg">
                                ${movie.vote_average}
                            </p>
                            <p class="movieVotes">
                            Total de avaliaçõs: ${ + movie.vote_count}
                            </p>
                            <p class="movieDate">
                               Data de lançamento: ${movie.release_date}
                            </p>
                        </div>
                    </div>
                    <div class="overview">
                    <p>
                        ${movie.overview}
                    </p>
                </div>
                `
                setMovie.appendChild(movieElement);
    
    
}


let lista =  [];
filmesSugeridos();

function filmesSugeridos(){

    console.log('sugeridos');
    fetch(FUTUROS)
        .then(respose => respose.json())
        .then(data =>{
            filme = data.results.slice(0,12)
            console.log(filme)
            lista = filme;
            sugestoes.innerHTML = '';
            filme.forEach(movie => {

                const {id, title, poster_path, vote_average, overview} = movie
                const movieElement = document.createElement('div');

                movieElement.classList.add('movie');
                movieElement.innerHTML = `
                    <div class="movie" onClick="loadMovie(${id})">
                            <img class="capa" src="${IMG_URL+poster_path}" alt="${title}">
                                <div class="movieinfo">
                                    <h3>${title}</h3>
                                    <span class="green">
                                        <img class="star" src="../img/Star.svg">
                                        ${vote_average}
                                    </span>                
                                </div>
                        </div>  
                `

                sugestoes.appendChild(movieElement);
            })
        }
    );

}

function loadMovie(val){
    lista.forEach(item =>{
        if(item.id == val){
            localStorage.setItem('movieId', JSON.stringify(item))
        }
    })
    window.location.href = "./movieDetail.html";
}

function goCatalogue(){
    window.location.href = "./catalogo.html";
}