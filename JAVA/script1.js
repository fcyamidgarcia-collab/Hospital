document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. MOSTRAR / OCULTAR CONTRASEÑA (OJITO)
  // ==========================================
  const toggleContrasena = document.getElementById("tooglecontraseña");
  const campoContrasena = document.getElementById("Ingresarcontraseña");

  if (toggleContrasena && campoContrasena) {
    toggleContrasena.addEventListener('click', function () {
      if (campoContrasena.type === "password") {
        campoContrasena.type = "text";
      } else {
        campoContrasena.type = "password";
      }
    });
  }

  // ==========================================
  // 2. INICIO DE SESIÓN (LOGIN CON MYSQL)
  // ==========================================
  const formularioLogin = document.getElementById('iniciarsesion');

  if (formularioLogin) {
    formularioLogin.addEventListener('submit', async function (event) {
      event.preventDefault(); // Evita que la página se recargue

      // Usamos las IDs exactas de login.html
      const correoInput = document.getElementById('Ingresarcorreo').value.trim();
      const passwordInput = document.getElementById('Ingresarcontraseña').value;

      try {
        const respuesta = await fetch('http://localhost:3000/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ correo: correoInput, password: passwordInput })
        });

        const datos = await respuesta.json();

        if (respuesta.ok) {
          // Guardamos la sesión del usuario devuelta por MySQL
          sessionStorage.setItem('usuarioLogueado', JSON.stringify(datos.usuario));
          
          // Redirigimos a la página de resultados
          window.location.href = 'resultados.html';
        } else {
          // Mensaje de error desde MySQL (ej. "Correo o contraseña incorrectos")
          alert(datos.mensaje);
        }
      } catch (error) {
        console.error('Error de conexión:', error);
        alert('No se pudo conectar con el servidor Backend. Verifica que "node server.js" esté corriendo.');
      }
    });
  }

  // ==========================================
  // 3. REGISTRO DE USUARIOS (REGISTRAR.HTML)
  // ==========================================
  const formularioRegistro = document.getElementById('formulario-registro');

  if (formularioRegistro) {
    formularioRegistro.addEventListener('submit', async function (event) {
      event.preventDefault();

      const nombres = document.getElementById('nombres').value.trim();
      const apellidos = document.getElementById('apellidos').value.trim();
      const correo = document.getElementById('correo').value.trim();
      const contrasena = document.getElementById('contrasena').value;
      const confirmarContrasena = document.getElementById('confirmar-contrasena').value;

      if (contrasena !== confirmarContrasena) {
        alert('Las contraseñas no coinciden. Por favor verifícalas.');
        return;
      }

      const nombreCompleto = `${nombres} ${apellidos}`;

      try {
        const respuesta = await fetch('http://localhost:3000/api/registro', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            nombre: nombreCompleto,
            correo: correo,
            password: contrasena
          })
        });

        const datos = await respuesta.json();

        if (respuesta.ok) {
          alert('¡Cuenta creada exitosamente! Ahora puedes iniciar sesión.');
          window.location.href = 'login.html';
        } else {
          alert(datos.mensaje);
        }
      } catch (error) {
        console.error('Error de conexión:', error);
        alert('No se pudo conectar con el servidor Backend.');
      }
    });
  }

});