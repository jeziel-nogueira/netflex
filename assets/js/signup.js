let btn = document.querySelector('#verSenha')
let btnConfirm = document.querySelector('#verConfirmSenha')

let nome = document.querySelector('#nome')
let labelNome = document.querySelector('#labelNome')
let validNome = false

let usuario = document.querySelector('#usuario')
let labelUsuario = document.querySelector('#labelUsuario')
let validUsuario = false

let senha = document.querySelector('#senha')
let labelSenha = document.querySelector('#labelSenha')
let validSenha = false

let confirmSenha = document.querySelector('#confirmSenha')
let labelConfirmSenha = document.querySelector('#labelConfirmSenha')
let validConfirmSenha = false

let msgError = document.querySelector('#msgError')
let msgSucces = document.querySelector('#msgSucces')

nome.addEventListener('keyup', ()=>{
  if(nome.value.length < 3){
    labelNome.setAttribute('style', 'color: blue')
    labelNome.innerHTML = 'Nome *minimo 3 caracteres.'
    nome.setAttribute('style', 'border-color: blue')
    validNome = false
  }else{
    labelNome.setAttribute('style', 'color: green')
    labelNome.innerHTML = 'Nome'
    nome.setAttribute('style', 'border-color: green')
    validNome = true
  }
})

usuario.addEventListener('keyup', ()=>{
  if(usuario.value.length < 5){
    labelUsuario.setAttribute('style', 'color: blue')
    labelUsuario.innerHTML = 'Usuário *minimo 5 caracteres.'
    usuario.setAttribute('style', 'border-color: blue')
    validUsuario = false
  }else{
    labelUsuario.setAttribute('style', 'color: green')
    labelUsuario.innerHTML = 'Usuário'
    usuario.setAttribute('style', 'border-color: green')
    validUsuario = true
  }
})

senha.addEventListener('keyup', ()=>{
  if(senha.value.length < 6){
    labelSenha.setAttribute('style', 'color: blue')
    labelSenha.innerHTML = 'Senha *minimo 6 caracteres.'
    senha.setAttribute('style', 'border-color: blue')
    validSenha = false
  }else{
    labelSenha.setAttribute('style', 'color: green')
    labelSenha.innerHTML = 'Senha'
    senha.setAttribute('style', 'border-color: green')
    validSenha = true
  }
})

confirmSenha.addEventListener('keyup', ()=>{
  if(confirmSenha.value != senha.value){
    labelConfirmSenha.setAttribute('style', 'color: blue')
    labelConfirmSenha.innerHTML = 'Confirmar Senha *senhas não conferem.'
    confirmSenha.setAttribute('style', 'border-color: blue')
    validConfirmSenha = false
  }else{
    labelConfirmSenha.setAttribute('style', 'color: green')
    labelConfirmSenha.innerHTML = 'Senha'
    confirmSenha.setAttribute('style', 'border-color: green')
    validConfirmSenha = true
  }
})

function cadastrar(){
  if(validNome && validUsuario && validSenha && validConfirmSenha){
    let listaUser = JSON.parse(localStorage.getItem('listaUser') || '[]')
    listaUser.push({
      nomeCad: nome.value,
      userCad: usuario.value,
      senhaCad: senha.value
    })
    
    localStorage.setItem('listaUser', JSON.stringify(listaUser))
    
    msgSucces.setAttribute('style','display: block')
    msgSucces.innerHTML = '<strong>Verificando...</strong>'
    msgError.setAttribute('style','display: none')
    msgError.innerHTML = ''
    
    setTimeout(()=>{
      window.location.href = '../../index.html'  
    },1500)
    
  }else{
    msgError.setAttribute('style','display: block')
    msgError.innerHTML = '<strong>Preencha todos os campos.</strong>'
    msgSucces.setAttribute('style','display: none')
    msgSucces.innerHTML = ''
  }
}

btn.addEventListener('click', ()=>{
  let inputSenha = document.querySelector('#senha')
  
  if(inputSenha.getAttribute('type') == 'password'){
    inputSenha.setAttribute('type', 'text')
  }else{
    inputSenha.setAttribute('type', 'password')
  }
})

btnConfirm.addEventListener('click', ()=>{
  let inputConfirmSenha = document.querySelector('#confirmSenha')
  
  if(inputConfirmSenha.getAttribute('type') == 'password'){
    inputConfirmSenha.setAttribute('type', 'text')
  }else{
    inputConfirmSenha.setAttribute('type', 'password')
  }
})