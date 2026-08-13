// Funcion menu hamburguesa

function mostrarMenu() {
  var menu = document.getElementById("enlacesMenu");

  if (menu.style.display === "flex") {
    menu.style.display = "none";
  } else {
    menu.style.display = "flex";
  }
}



// Funcion año
function mostrarAnioActual() {
  var fecha = new Date();
  var anio = fecha.getFullYear();

  document.getElementById("anioActual").innerHTML = anio;
}

mostrarAnioActual();


// Funcion boton arriba
function irArriba() {
  window.scrollTo(0, 0);
}


function corregirMenu() {
  var menu = document.getElementById("enlacesMenu");
 
  if (window.innerWidth > 900) {
    menu.style.display = "";
  }
}
 
// la ejecutamos cada vez que cambia el tamaño de la ventana
window.onresize = corregirMenu;