document.addEventListener('DOMContentLoaded', function () {

  /* ===================================
     1. CONTADOR ANIMADO DE ESTADÍSTICAS
  =================================== */
  const numerosEstadisticas = document.querySelectorAll('.numero-estadistica');

  function animarContador(elemento) {
    const textoOriginal = elemento.textContent.trim();
    const coincidencia = textoOriginal.match(/^(\d+)(.*)$/);

    if (!coincidencia) return;

    const numeroFinal = parseInt(coincidencia[1], 10);
    const sufijo = coincidencia[2];
    const duracion = 1500;
    const fotogramasPorSegundo = 60;
    const totalFotogramas = Math.round((duracion / 1000) * fotogramasPorSegundo);
    let fotogramaActual = 0;

    elemento.textContent = '0' + sufijo;

    const intervalo = setInterval(() => {
      fotogramaActual++;
      const progreso = fotogramaActual / totalFotogramas;
      const valorActual = Math.round(numeroFinal * progreso);

      elemento.textContent = valorActual + sufijo;

      if (fotogramaActual >= totalFotogramas) {
        elemento.textContent = numeroFinal + sufijo;
        clearInterval(intervalo);
      }
    }, 1000 / fotogramasPorSegundo);
  }

  /* ===================================
     2. EFECTO MÁQUINA DE ESCRIBIR EN EL TÍTULO PRINCIPAL
  =================================== */
  function animarMaquinaDeEscribir(elemento) {
    const textoCompleto = elemento.textContent.trim();
    elemento.textContent = '';
    elemento.classList.add('cursor-escritura');

    let indice = 0;

    const intervalo = setInterval(() => {
      elemento.textContent += textoCompleto.charAt(indice);
      indice++;

      if (indice >= textoCompleto.length) {
        clearInterval(intervalo);
        setTimeout(() => elemento.classList.remove('cursor-escritura'), 900);
      }
    }, 55);
  }

  const tituloPrincipal = document.querySelector('.titulo-principal');
  let tituloYaAnimado = false;

  /* ===================================
     3. REVELADO DE PÁRRAFOS PALABRA POR PALABRA
  =================================== */
  function prepararRevelacionDePalabras(elemento) {
    const textoOriginal = elemento.textContent.trim();
    const palabras = textoOriginal.split(/\s+/);

    elemento.innerHTML = palabras
      .map(palabra => `<span class="palabra-revelada">${palabra}</span>`)
      .join(' ');
  }

  function animarRevelacionDePalabras(elemento) {
    const palabras = elemento.querySelectorAll('.palabra-revelada');

    palabras.forEach((palabra, indice) => {
      setTimeout(() => {
        palabra.classList.add('palabra-visible');
      }, indice * 35);
    });
  }

  const parrafosRevelables = document.querySelectorAll(
    '.parrafo-introduccion, .parrafo-mision-vision'
  );

  parrafosRevelables.forEach(prepararRevelacionDePalabras);

  /* ===================================
     4. ANIMACIÓN AL HACER SCROLL (fade + slide)
  =================================== */
  const elementosAnimables = document.querySelectorAll(
    '.tarjeta-estadistica, .tarjeta-mision, .tarjeta-vision, .tarjeta-valor'
  );

  elementosAnimables.forEach(elemento => {
    elemento.classList.add('oculto-animacion');
  });

  let contadorYaEjecutado = false;

  const observador = new IntersectionObserver((entradas) => {
    entradas.forEach(entrada => {
      if (entrada.isIntersecting) {
        entrada.target.classList.add('mostrar-animacion');

        // Estadísticas: animar números una sola vez
        if (entrada.target.closest('.contenedor-estadisticas') && !contadorYaEjecutado) {
          numerosEstadisticas.forEach(animarContador);
          contadorYaEjecutado = true;
        }

        observador.unobserve(entrada.target);
      }
    });
  }, { threshold: 0.3 });

  elementosAnimables.forEach(elemento => observador.observe(elemento));

  // Observador aparte para el título (máquina de escribir) y los párrafos (palabra por palabra)
  const observadorTexto = new IntersectionObserver((entradas) => {
    entradas.forEach(entrada => {
      if (entrada.isIntersecting) {

        if (entrada.target === tituloPrincipal && !tituloYaAnimado) {
          animarMaquinaDeEscribir(tituloPrincipal);
          tituloYaAnimado = true;
        }

        if (entrada.target.classList.contains('parrafo-introduccion') ||
            entrada.target.classList.contains('parrafo-mision-vision')) {
          animarRevelacionDePalabras(entrada.target);
        }

        observadorTexto.unobserve(entrada.target);
      }
    });
  }, { threshold: 0.5 });

  if (tituloPrincipal) observadorTexto.observe(tituloPrincipal);
  parrafosRevelables.forEach(parrafo => observadorTexto.observe(parrafo));

  /* ===================================
     5. ÍCONOS DE VALORES: color + escala + rebote al hover
  =================================== */
  const tarjetasValores = document.querySelectorAll('.tarjeta-valor');

  tarjetasValores.forEach(tarjeta => {
    const circulo = tarjeta.querySelector('.circulo-icono');
    const icono = tarjeta.querySelector('.icono-valor');
    const nombre = tarjeta.querySelector('.nombre-valor');

    tarjeta.addEventListener('mouseenter', () => {
      circulo.classList.add('circulo-icono-activo');
      icono.classList.add('icono-valor-rebote');
      nombre.classList.add('nombre-valor-activo');
    });

    tarjeta.addEventListener('mouseleave', () => {
      circulo.classList.remove('circulo-icono-activo');
      nombre.classList.remove('nombre-valor-activo');
    });

    // Reiniciar la animación de rebote cada vez que termina, para poder repetirla
    icono.addEventListener('animationend', () => {
      icono.classList.remove('icono-valor-rebote');
    });
  });

  /* ===================================
     6. ÍCONOS DE ESTADÍSTICAS: pulso + color al hover
  =================================== */
  const tarjetasEstadisticas = document.querySelectorAll('.tarjeta-estadistica');

  tarjetasEstadisticas.forEach(tarjeta => {
    const icono = tarjeta.querySelector('.icono-estadistica');

    tarjeta.addEventListener('mouseenter', () => {
      icono.classList.add('icono-estadistica-activo');
    });

    tarjeta.addEventListener('mouseleave', () => {
      icono.classList.remove('icono-estadistica-activo');
    });
  });

  /* ===================================
     7. SUBRAYADO ANIMADO EN LOS SUBTÍTULOS (Misión / Visión)
  =================================== */
  const subtitulos = document.querySelectorAll('.subtitulo');

  subtitulos.forEach(subtitulo => {
    subtitulo.classList.add('subtitulo-subrayado');
  });

  const observadorSubtitulos = new IntersectionObserver((entradas) => {
    entradas.forEach(entrada => {
      if (entrada.isIntersecting) {
        entrada.target.classList.add('subtitulo-subrayado-activo');
        observadorSubtitulos.unobserve(entrada.target);
      }
    });
  }, { threshold: 0.6 });

  subtitulos.forEach(subtitulo => observadorSubtitulos.observe(subtitulo));

  /* ===================================
     8. TÍTULO "NUESTROS VALORES": ligera animación de entrada
  =================================== */
  const tituloValores = document.querySelector('.titulo-valores');

  if (tituloValores) {
    tituloValores.classList.add('oculto-animacion');

    const observadorTituloValores = new IntersectionObserver((entradas) => {
      entradas.forEach(entrada => {
        if (entrada.isIntersecting) {
          entrada.target.classList.add('mostrar-animacion');
          observadorTituloValores.unobserve(entrada.target);
        }
      });
    }, { threshold: 0.4 });

    observadorTituloValores.observe(tituloValores);
  }

});