// ==========================================
// FUNCIONES GLOBALES (Usadas en HTML con onclick)
// ==========================================

// Filtro de Médicos / Agendar Cita
function agendarCita(nombreMedico) {
  alert(
    "Has seleccionado al " +
      nombreMedico +
      ".\n\nSerás dirigido al formulario para agendar tu cita.",
  );
  window.location.href = "AgendarCita.html";
}

// Menú Hamburguesa
function mostrarMenu() {
  const menu = document.getElementById("enlacesMenu");
  if (menu) {
    menu.style.display = menu.style.display === "flex" ? "none" : "flex";
  }
}

// Botón para ir arriba
function irArriba() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Reajuste de menú en cambio de pantalla
function corregirMenu() {
  const menu = document.getElementById("enlacesMenu");
  if (menu && window.innerWidth > 900) {
    menu.style.display = "";
  }
}
window.onresize = corregirMenu;

// Registro de usuario vía API
async function registrarUsuario(event) {
  event.preventDefault();

  const nombre = document.getElementById("reg-nombre")?.value.trim();
  const correo = document.getElementById("reg-correo")?.value.trim();
  const password = document.getElementById("reg-password")?.value;

  if (!nombre || !correo || !password) {
    alert("Por favor completa todos los campos.");
    return;
  }

  try {
    const respuesta = await fetch("http://localhost:3000/api/registro", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, correo, password }),
    });

    const datos = await respuesta.json();

    if (respuesta.ok) {
      alert("¡Cuenta creada con éxito! Ahora puedes iniciar sesión.");
      window.location.href = "sesion.html";
    } else {
      alert(datos.mensaje);
    }
  } catch (error) {
    console.error("Error al registrar:", error);
    alert("No se pudo conectar con el servidor.");
  }
}

// ==========================================
// LÓGICA PRINCIPAL AL CARGAR EL DOM
// ==========================================
document.addEventListener("DOMContentLoaded", function () {
  // ------------------------------------------
  // 1. CONTROL Y PROTECCIÓN DE RUTAS
  // ------------------------------------------
  // Define aquí solo las páginas que REQUIEREN estar logueado para entrar
  const paginasProtegidas = ["resultados.html", "AgendarCita.html"];
  const rutaActual = window.location.pathname;
  const esPaginaProtegida = paginasProtegidas.some((pagina) =>
    rutaActual.includes(pagina),
  );

  const usuarioLogueado = sessionStorage.getItem("usuarioLogueado");

  // Si intenta entrar a una página protegida SIN iniciar sesión
  if (esPaginaProtegida && !usuarioLogueado) {
    window.location.href = "sesion.html";
    return; // Frena la ejecución del resto del código
  }

  // ------------------------------------------
  // 2. FILTRO DE MÉDICOS
  // ------------------------------------------
  const botonesFiltro = document.querySelectorAll(".boton-filtro");
  const tarjetasMedicos = document.querySelectorAll(".tarjeta-medico");

  if (botonesFiltro.length > 0) {
    botonesFiltro.forEach(function (boton) {
      boton.addEventListener("click", function () {
        const especialidadSeleccionada =
          boton.getAttribute("data-especialidad");

        botonesFiltro.forEach(function (botonActual) {
          botonActual.classList.remove("activo");
        });
        boton.classList.add("activo");

        tarjetasMedicos.forEach(function (tarjeta) {
          const especialidad = tarjeta.getAttribute("data-especialidad");
          if (
            especialidadSeleccionada === "todos" ||
            especialidad === especialidadSeleccionada
          ) {
            tarjeta.style.display = "block";
          } else {
            tarjeta.style.display = "none";
          }
        });
      });
    });
  }

  // ------------------------------------------
  // 3. FORMULARIO DE CONTACTO
  // ------------------------------------------
  const formularioContacto = document.getElementById("formularioContacto");

  if (formularioContacto) {
    formularioContacto.addEventListener("submit", function (evento) {
      evento.preventDefault();

      const nombre = document.getElementById("nombre").value.trim();
      const correo = document.getElementById("correo").value.trim();
      const telefono = document.getElementById("telefono").value.trim();
      const mensaje = document.getElementById("mensaje").value.trim();

      /* VALIDAR NOMBRE */

      const nombreValido =
        /^[A-Za-zÁÉÍÓÚáéíóúÑñÜü]+(?:\s+[A-Za-zÁÉÍÓÚáéíóúÑñÜü]+)+$/;

      if (nombre === "") {
        alert("Por favor, ingresa tu nombre completo.");
        return;
      }

      if (nombre.length < 5 || nombre.length > 40) {
        alert("El nombre debe tener entre 5 y 40 caracteres.");
        return;
      }

      if (!nombreValido.test(nombre)) {
        alert("Ingresa tu nombre y apellido. Solo se permiten letras.");
        return;
      }

      /* VALIDAR CORREO */

      const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (correo === "") {
        alert("Por favor, ingresa tu correo electrónico.");
        return;
      }

      if (!correoValido.test(correo)) {
        alert("Ingresa un correo electrónico válido.");
        return;
      }

      /* VALIDAR TELÉFONO */

      const telefonoLimpio = telefono.replace(/\s/g, "");

      const telefonoValido = /^[0-9]+$/;

      if (telefono === "") {
        alert("Por favor, ingresa tu número de teléfono.");
        return;
      }

      if (!telefonoValido.test(telefonoLimpio)) {
        alert("El teléfono solo puede contener números.");
        return;
      }

      if (telefonoLimpio.length < 7 || telefonoLimpio.length > 10) {
        alert("El teléfono debe tener entre 7 y 10 números.");
        return;
      }

      /* VALIDAR MENSAJE */

      if (mensaje === "") {
        alert("Por favor, escribe un mensaje.");
        return;
      }

      if (mensaje.length < 10) {
        alert("El mensaje debe tener mínimo 10 caracteres.");
        return;
      }

      if (mensaje.length > 500) {
        alert("El mensaje no puede superar los 500 caracteres.");
        return;
      }

      /* FORMULARIO CORRECTO */

      alert(
        "¡Mensaje enviado correctamente, " +
          nombre +
          "!\n\nNuestro equipo se pondrá en contacto contigo.",
      );

      formularioContacto.reset();
    });
  }

  // ------------------------------------------
  // 4. MOSTRAR AÑO ACTUAL EN FOOTER
  // ------------------------------------------
  const elemAnio = document.getElementById("anioActual");
  if (elemAnio) {
    elemAnio.innerHTML = new Date().getFullYear();
  }

  // ------------------------------------------
  // 5. LÓGICA PARA CERRAR SESIÓN
  // ------------------------------------------
  const btnCerrarSesion = document.getElementById("boton-urgencias");

  if (btnCerrarSesion) {
    btnCerrarSesion.addEventListener("click", () => {
      const confirmar = confirm("¿Estás seguro de que deseas cerrar sesión?");

      if (confirmar) {
        sessionStorage.removeItem("usuarioLogueado");
        sessionStorage.clear();
        window.location.href = "sesion.html";
      }
    });
  }
});
