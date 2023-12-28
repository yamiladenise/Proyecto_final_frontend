// elementos del HTML
let divPersonajes = document.getElementById('personajes');
     // botones de filtros
let botonFiltroTodo = document.getElementById('filtroTodos');
let botonFiltroMujeres = document.getElementById('filtroMujeres');
let botonFiltroHombres = document.getElementById('filtroHombres');
let botonFiltroDesconocido = document.getElementById('filtroDesconocido'); 
let botonFiltroSinGenero = document.getElementById('filtroSinGenero');
let botonPrimeraPagina =document.getElementById('primeraPagina');
     // boton del paginado
let botonAnteriorPagina = document.getElementById('anterior');
let botonSiguientePagina = document.getElementById('siguiente');
let botonUltimaPagina = document.getElementById('ultimaPagina');





let totalPersonajes;
let paginaActual=1;

// funcion para mostrar los personajes en el HTML

function mostrarEnElHtml(arrayPersonajes){
    //vacio lo que habia en el div antes
    divPersonajes.innerHTML='';
    arrayPersonajes.forEach((itemPersonaje) => {
        // al div lo concateno con los personajes que quiero mostrar
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

}


//pedido de info con fetch
function pedidoFetch(pagina){
     fetch('https://rickandmortyapi.com/api/character/?page='+ pagina)
     .then((data)=>{
          return data.json();
     }).then((data)=>{
          totalPersonajes = data.results;
 // personaje es un array de objetos
         mostrarEnElHtml(totalPersonajes);
     })


}
 
pedidoFetch(paginaActual);


//eventos

//1- Nos tremos el elemento  html que queremos agregarle el evento.
//2- Crear una funcion que se ejecute cuando se realice un evento.
//3- Creamos el evento, conectando todo

//funciones para el filtro
         // crea un array que solo va a buscar mujeres. 
function filtroMujer(){
    let mujeres= totalPersonajes.filter((itemPersonaje)=>{
        return itemPersonaje.gender=== 'Female';
    });
    mostrarEnElHtml(mujeres)

};

function filtroHombre (){
    let hombres= totalPersonajes.filter((itemPersonaje)=>{
        return itemPersonaje.gender==='Male';
    });
    mostrarEnElHtml(hombres)
};

function filtroTodo (){
    mostrarEnElHtml(totalPersonajes)
}

function filtroDesconocido (){
    let desconocido= totalPersonajes.filter((itemPersonaje)=>{
        return itemPersonaje.gender==='unknown';
    });
    mostrarEnElHtml(desconocido)
};

function filtroSinGenero () {
    let singenero = totalPersonajes.filter((itemPersonaje)=>{
        if(itemPersonaje.gender==='Genderless'){
            return itemPersonaje.gender==='Genderless'
        }
    });
    mostrarEnElHtml(singenero);
}


// CREAR EVENTO
// esta funcion solo se va a ejecutar cuando haga click a este boton
//elementoHTML.addEventListener('tipo de evento',funcion que se ejecuta cuando se da el evento)
botonFiltroMujeres.addEventListener('click', filtroMujer);
botonFiltroHombres.addEventListener('click',filtroHombre);
botonFiltroTodo.addEventListener('click',filtroTodo);
botonFiltroDesconocido.addEventListener('click',filtroDesconocido);
botonFiltroSinGenero.addEventListener('click',filtroSinGenero);

botonPrimeraPagina.disabled= true;
botonAnteriorPagina.disabled=true;
botonSiguientePagina.disabled= false;
botonUltimaPagina.disabled=false;

// paginado
function siguientePagina() {
    // a la pagina actual le sumo 1
    paginaActual++;
    if(paginaActual===42){
        botonSiguientePagina.disabled= true;
        botonUltimaPagina.disabled=true;
    }else{
        botonAnteriorPagina.disabled=false;
        botonPrimeraPagina.disabled=false;
    }
    // se ejecuta el pedido fetch
    pedidoFetch(paginaActual);

};

function anteriorPagina (){
    paginaActual--;
    if(paginaActual===1){
        botonAnteriorPagina.disabled=true;
        botonPrimeraPagina.disabled=true;
    }else{
        botonSiguientePagina.disabled= false;
        botonUltimaPagina.disabled=false;
    }
    pedidoFetch(paginaActual);
};

function primeraPagina(){
    paginaActual=1
    botonAnteriorPagina.disabled = true;
    botonPrimeraPagina.disabled = true;
    botonSiguientePagina.disabled = false;
    botonUltimaPagina.disabled = false;
    pedidoFetch(1);
};

function ultimaPagina(){
    paginaActual=42
    botonSiguientePagina.disabled = true;
    botonUltimaPagina.disabled = true;
    botonAnteriorPagina.disabled = false;
    botonPrimeraPagina.disabled = false;
    pedidoFetch(paginaActual);
}

// boton paginado
botonSiguientePagina.addEventListener('click',siguientePagina);
botonAnteriorPagina.addEventListener('click',anteriorPagina);
botonPrimeraPagina.addEventListener('click',primeraPagina);
botonUltimaPagina.addEventListener('click',ultimaPagina);