document.addEventListener('DOMContentLoaded', function() {
    // Conectamos el formulario
    const formulario = document.getElementById('formulario-registro');

    if (formulario) {
        // Reglas para validar
        const soloLetras = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
        const soloNumeros = /^[0-9]+$/;
        const formatoCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        formulario.addEventListener('submit', async function(evento) {
            evento.preventDefault(); // Evitamos que la página se recargue
            let todoCorrecto = true;

            // 1. VALIDAR NOMBRES
            const valorNombres = document.getElementById('nombres').value.trim();
            const mensajeNombres = document.getElementById('error-nombres');
            
            if (valorNombres === '') {
                mensajeNombres.textContent = 'Los nombres son obligatorios.';
                todoCorrecto = false;
            } else if (!soloLetras.test(valorNombres)) {
                mensajeNombres.textContent = 'Solo se permiten letras.';
                todoCorrecto = false;
            } else {
                mensajeNombres.textContent = '';
            }

            // 2. VALIDAR APELLIDOS
            const valorApellidos = document.getElementById('apellidos').value.trim();
            const mensajeApellidos = document.getElementById('error-apellidos');

            if (valorApellidos === '') {
                mensajeApellidos.textContent = 'Los apellidos son obligatorios.';
                todoCorrecto = false;
            } else if (!soloLetras.test(valorApellidos)) {
                mensajeApellidos.textContent = 'Solo se permiten letras.';
                todoCorrecto = false;
            } else {
                mensajeApellidos.textContent = ''; 
            }

            // 3. VALIDAR DOCUMENTO
            const valorDocumento = document.getElementById('documento').value.trim();
            const mensajeDocumento = document.getElementById('error-documento');

            if (valorDocumento === '') {
                mensajeDocumento.textContent = 'El documento es obligatorio.';
                todoCorrecto = false;
            } else if (!soloNumeros.test(valorDocumento)) {
                mensajeDocumento.textContent = 'Solo se permiten números.';
                todoCorrecto = false;
            } else {
                mensajeDocumento.textContent = '';
            }

            // 4. VALIDAR TELÉFONO
            const valorTelefono = document.getElementById('numero').value.trim();
            const mensajeTelefono = document.getElementById('error-numero');

            if (valorTelefono === '') {
                mensajeTelefono.textContent = 'El teléfono es obligatorio.';
                todoCorrecto = false;
            } else if (!soloNumeros.test(valorTelefono)) {
                mensajeTelefono.textContent = 'Solo se permiten números.';
                todoCorrecto = false;
            } else {
                mensajeTelefono.textContent = '';
            }

            // 5. VALIDAR CORREO
            const valorCorreo = document.getElementById('correo').value.trim();
            const mensajeCorreo = document.getElementById('error-correo');

            if (valorCorreo === '') {
                mensajeCorreo.textContent = 'El correo es obligatorio.';
                todoCorrecto = false;
            } else if (!formatoCorreo.test(valorCorreo)) {
                mensajeCorreo.textContent = 'El formato del correo no es válido.';
                todoCorrecto = false;
            } else {
                mensajeCorreo.textContent = '';
            }

            // 6. VALIDAR CONTRASEÑA
            const valorContrasena = document.getElementById('contrasena').value;
            const mensajeContrasena = document.getElementById('error-contrasena');

            if (valorContrasena === '') {
                mensajeContrasena.textContent = 'La contraseña es obligatoria.';
                todoCorrecto = false;
            } else if (valorContrasena.length < 6) {
                mensajeContrasena.textContent = 'Debe tener mínimo 6 caracteres.';
                todoCorrecto = false;
            } else {
                mensajeContrasena.textContent = '';
            }

            // 7. CONFIRMAR CONTRASEÑA
            const valorConfirmar = document.getElementById('confirmar-contrasena').value;
            const mensajeConfirmar = document.getElementById('error-confirmar');

            if (valorConfirmar === '') {
                mensajeConfirmar.textContent = 'Debe confirmar su contraseña.';
                todoCorrecto = false;
            } else if (valorConfirmar !== valorContrasena) {
                mensajeConfirmar.textContent = 'Las contraseñas no son iguales.';
                todoCorrecto = false;
            } else {
                mensajeConfirmar.textContent = '';
            }

            // =========================================================
            // PASO FINAL: ENVIAR A MYSQL SI TODAS LAS VALIDACIONES PASAN
            // =========================================================
            if (todoCorrecto) {
                try {
                    const respuesta = await fetch('http://localhost:3000/api/registro', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            nombre: `${valorNombres} ${valorApellidos}`,
                            correo: valorCorreo,
                            password: valorContrasena
                        })
                    });

                    const datos = await respuesta.json();

                    if (respuesta.ok) {
                        alert("¡Cuenta creada e insertada en MySQL con éxito!");
                        formulario.reset();
                        window.location.href = 'resultados.html'; // Cambiar a 'sesion.html' según el nombre de su vista de login
                    } else {
                        alert(datos.mensaje);
                    }
                } catch (error) {
                    console.error('Error al conectar:', error);
                    alert('No se pudo conectar con el Backend. Verifiquen que "node server.js" esté encendido en la terminal.');
                }
            }
        });
    }
});

// ==========================================
// FUNCIONES AUXILIARES (MENÚ, AÑO, SCROLL)
// ==========================================

function mostrarMenu() {
    var menu = document.getElementById("enlacesMenu");
    if (menu) {
        menu.style.display = (menu.style.display === "flex") ? "none" : "flex";
    }
}

function mostrarAnioActual() {
    var fecha = new Date();
    var anio = fecha.getFullYear();
    var elem = document.getElementById("anioActual");
    if (elem) elem.innerHTML = anio;
}
mostrarAnioActual();

function irArriba() {
    window.scrollTo(0, 0);
}

function corregirMenu() {
    var menu = document.getElementById("enlacesMenu");
    if (menu && window.innerWidth > 900) {
        menu.style.display = "";
    }
}
window.onresize = corregirMenu;