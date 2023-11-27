let setMovie = document.getElementById('result');
let indexA = 0;
let indexB = 20;

const API_KEY = 'api_key=3b13d1c5fa5a243ae3eb4ce36a871a8a';
const IMG_URL = 'https://image.tmdb.org/t/p/w500/';
const LANGUAGE = '&language=pt-BR';


let userLogado = JSON.parse(localStorage.getItem('userLogado'));

if(localStorage.getItem('token') == null){
    window.location.href= '../../index.html'
}

if(localStorage.getItem('busca') != null){
    console.log(localStorage.getItem('busca'));
    if(localStorage.getItem('busca') == ''){
        console.log('vazio msm');
        localStorage.removeItem('busca');
    }
    else{
        let url = 'https://api.themoviedb.org/3/search/movie?query=' + localStorage.getItem('busca') + LANGUAGE + '&' + API_KEY;
        //query=termo

        loadResults(url);
        localStorage.removeItem('busca');
    }
}

function sair(){
    localStorage.removeItem('token')
    localStorage.removeItem('userLogado')
    window.location.href= '../../index.html'
}


function buscar(){    
    
    let search = document.querySelector('#search')
    
    let URL = 'https://api.themoviedb.org/3/search/movie?query=' + search.value + '&' + API_KEY;
    search.value = '';
    //query=termo

    loadResults(URL);

}
 let lista = [];
function loadResults(val){
    fetch(val + '&sort_by=popularity')
        .then(respose => respose.json())
        .then(data =>{
            movies = data.results.slice(indexA, indexB)
            lista = movies;
            
            setMovie.innerHTML = '';
                movies.forEach(movie => {

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
                    setMovie.appendChild(movieElement);
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