// Abriry crerrar menu uwu
function mostrarMenu() {
  const menu = document.getElementById('enlacesMenu');
  menu.classList.toggle('menu-abierto');
}

// el anio actual uwu
document.getElementById('anioActual').textContent = new Date().getFullYear();

// Ver más o ver menos de las tarjetas :3
const enlacesVerMas = document.querySelectorAll('.enlace-ver-mas');

enlacesVerMas.forEach(function (enlace) {
  enlace.addEventListener('click', function () {
    const tarjeta = enlace.closest('.tarjeta-especialidad');
    const textoExtra = tarjeta.querySelector('.texto-extra');

    if (textoExtra.style.display === 'block') {
      textoExtra.style.display = 'none';
      enlace.textContent = 'Ver más';
    } else {
      textoExtra.style.display = 'block';
      enlace.textContent = 'Ver menos';
    }
  });
});