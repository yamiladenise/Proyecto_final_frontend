// elementos del HTML
let divPersonajes= document.getElementById('personajes')
let botonFiltroTodo= document.getElementById('filtroTodos') 
let botonFiltroMujeres= document.getElementById('filtroMujeres') 
let botonFiltroHombres= document.getElementById('filtroHombres') 
let botonFiltroIndefinido= document.getElementById('filtroIndefinido') 
let botonFiltroSinGenero= document.getElementById('filtroSinGenero')

let totalPersonajes;


//pedido de info con fetch
fetch('https://rickandmortyapi.com/api/character')
.then((data)=>{
    return data.json();
}).then((data)=>{
     totalPersonajes = data.results;
 // personaje es un array de objetos
 totalPersonajes.forEach((itemPersonaje) => {
   divPersonajes.innerHTML+=  ` <div class= "personaje">
                                     <h3>Nombre: ${itemPersonaje.name}</h3>
                                     <p>Genero ${itemPersonaje.gender}</p>
                                     <p>Especie ${itemPersonaje.species}</p>
                                     <p>Estado ${itemPersonaje.status}</p>
                                     <p>Origen ${itemPersonaje.origin}</p>
                                     <p>Locacion ${itemPersonaje.location}</p>
                                     <img src=${itemPersonaje.image} >
                                </div>`
 })
})


//eventos

//1- Nos tremos el elemento  html que queremos agregarle el evento.
//2- Crear una funcion que se ejecute cuando se realice un evento.
//3- Creamos el evento, conectando todo

//funciones para el filtro

function filtroMujer(){

}