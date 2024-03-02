let intentos = 6;
let palabra;

const button = document.getElementById("guess-button");
const GRID = document.getElementById("grid");

fetch('https://random-word-api.vercel.app/api?words=1&length=5&type=uppercase&alphabetize=true')
    .then(response=> response.json())
    .then(response => {
        palabra=response[0]
        console.log("La palabra ganadora es: " + palabra)
    })
    .catch(err => console.log(err));

button.addEventListener("click", intentar);
function intentar(){

    if (document.getElementById("guess-input").value.length !=5) {
        alert("Debe ingresar 5 letras")
    } else {
        const ROW = document.createElement('div');
        ROW.className = 'row';
        const INTENTO= leerIntento();
  
    if (INTENTO === palabra ) {
    const ROW = document.createElement('div');
    ROW.className = 'row';

    for (let i in palabra) {
        const SPAN = document.createElement('span');
        SPAN.className = 'letter';
        SPAN.innerHTML = palabra[i];
        SPAN.style.backgroundColor = 'green';
        ROW.appendChild(SPAN);
    }

    GRID.appendChild(ROW);
    terminar("<h1>GANASTE!:)</h1>")
        
    return
}
for (let i in palabra){
    const SPAN = document.createElement('span');
    SPAN.className = 'letter';
    if (INTENTO[i]===palabra[i]){
        SPAN.innerHTML = INTENTO[i];
        SPAN.style.backgroundColor = 'green';
    } else if( palabra.includes(INTENTO[i]) ) {
        SPAN.innerHTML = INTENTO[i];
        SPAN.style.backgroundColor = 'yellow';
    } else {
        SPAN.innerHTML = INTENTO[i];
        SPAN.style.backgroundColor = 'grey';
    }

    ROW.appendChild(SPAN);
}
    GRID.appendChild(ROW);

    intentos--
    if (intentos==0){
        terminar("<h1>PERDISTE!:(</h1>")       
}}}

function terminar(mensaje){
    const INPUT = document.getElementById("guess-input");
    INPUT.disabled = true;
    button.disabled = true;
    let contenedor = document.getElementById('guesses');
    contenedor.innerHTML = mensaje;
}

function leerIntento(){
    let intento = document.getElementById("guess-input");
    intento = intento.value;
    intento = intento.toUpperCase(); 
    return intento;
}