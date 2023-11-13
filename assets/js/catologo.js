let userLogado = JSON.parse(localStorage.getItem('userLogado'))

if(localStorage.getItem('token') == null){
    window.location.href= '../../index.html'
}

function sair(){
    localStorage.removeItem('token')
    localStorage.removeItem('userLogado')
    window.location.href= '../../index.html'
}