document.addEventListener('DOMContentLoaded', function () {

  // ==========================================
  // 1. VERIFICACIÓN DE SESIÓN (PROTECCIÓN)
  // ==========================================
  const esPaginaAgendar = window.location.pathname.includes("AgendarCita.html");
  const usuarioLogueado = sessionStorage.getItem("usuarioLogueado");

  // Si está intentando entrar a AgendarCita.html SIN haber iniciado sesión
  if (esPaginaAgendar && !usuarioLogueado) {
    window.location.href = "sesionCita.html";
    return; // Detiene la ejecución para no cargar lo demás
  }


  // ==========================================
  // 2. LÓGICA DE AGENDAR CITA (Si existe el formulario)
  // ==========================================
  const formulario = document.querySelector('.formulario-cita');

  if (formulario) {
    const especialidad = document.getElementById('especialidad');
    const medico = document.getElementById('medico');
    const fecha = document.getElementById('fecha');
    const hora = document.getElementById('hora');
    const nombre = document.getElementById('nombre');
    const telefono = document.getElementById('telefono');
    const correo = document.getElementById('correo');
    const documento = document.getElementById('documento');
    const motivo = document.getElementById('motivo');

    const pasos = document.querySelectorAll('.paso');
    const lineas = document.querySelectorAll('.linea-paso');

    // Restricciones de escritura en vivo
    if (telefono) {
      telefono.addEventListener('input', function () {
        telefono.value = telefono.value.replace(/[^0-9\s]/g, '');
      });
    }

    if (documento) {
      documento.addEventListener('input', function () {
        documento.value = documento.value.replace(/[^0-9]/g, '');
      });
    }

    if (nombre) {
      nombre.addEventListener('input', function () {
        nombre.value = nombre.value.replace(/[^A-Za-zÀ-ÿñÑ\s]/g, '');
      });
    }

    const hoy = new Date();
    const hoyISO = hoy.toISOString().split('T')[0];
    if (fecha) fecha.setAttribute('min', hoyISO);

    // Validaciones por campo
    function validarEspecialidad() {
      return especialidad && especialidad.value === '' ? 'Selecciona una especialidad.' : '';
    }

    function validarMedico() {
      return medico && medico.value === '' ? 'Selecciona un médico.' : '';
    }

    function validarFecha() {
      if (!fecha || fecha.value === '') return 'Selecciona una fecha.';

      const fechaSeleccionada = new Date(fecha.value + 'T00:00:00');
      const fechaHoy = new Date(hoyISO + 'T00:00:00');

      if (isNaN(fechaSeleccionada.getTime())) return 'La fecha no es válida.';
      if (fechaSeleccionada < fechaHoy) return 'La fecha no puede ser anterior a hoy.';

      const fechaMaxima = new Date(fechaHoy);
      fechaMaxima.setDate(fechaMaxima.getDate() + 90);
      if (fechaSeleccionada > fechaMaxima) {
        return 'Solo se pueden agendar citas dentro de los próximos 90 días.';
      }
      return '';
    }

    function validarHora() {
      if (!hora || hora.value === '') return 'Selecciona una hora.';

      const partes = hora.value.split(':').map(Number);
      const minutosTotales = partes[0] * 60 + partes[1];

      if (minutosTotales < 7 * 60 || minutosTotales > 19 * 60) {
        return 'El horario de atención es de 7:00 a.m. a 7:00 p.m.';
      }

      if (fecha && fecha.value === hoyISO) {
        const ahora = new Date();
        const minutosAhora = ahora.getHours() * 60 + ahora.getMinutes();
        if (minutosTotales <= minutosAhora + 30) {
          return 'Para citas de hoy, elige una hora al menos 30 minutos después de la actual.';
        }
      }
      return '';
    }

    function validarNombre() {
      if (!nombre) return '';
      const valor = nombre.value.trim();
      if (valor === '') return 'Escribe tu nombre completo.';
      if (valor.length < 5) return 'El nombre es demasiado corto.';
      if (valor.split(/\s+/).length < 2) return 'Escribe nombre y apellido.';
      if (!/^[A-Za-zÀ-ÿñÑ\s]+$/.test(valor)) return 'El nombre solo puede contener letras.';
      return '';
    }

    function validarTelefono() {
      if (!telefono) return '';
      const valor = telefono.value.replace(/\s/g, '');
      if (valor === '') return 'Escribe tu teléfono.';
      if (!/^[0-9]+$/.test(valor)) return 'El teléfono solo puede contener números.';
      if (valor.length < 7 || valor.length > 10) return 'El teléfono debe tener entre 7 y 10 dígitos.';
      return '';
    }

    function validarCorreo() {
      if (!correo) return '';
      const valor = correo.value.trim();
      if (valor === '') return 'Escribe tu correo electrónico.';
      const patron = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
      if (!patron.test(valor)) return 'Escribe un correo electrónico válido.';
      return '';
    }

    function validarDocumento() {
      if (!documento) return '';
      const valor = documento.value.trim();
      if (valor === '') return 'Escribe tu documento de identidad.';
      if (valor.length < 6 || valor.length > 10) return 'El documento debe tener entre 6 y 10 dígitos.';
      return '';
    }

    function validarMotivo() {
      if (!motivo) return '';
      const valor = motivo.value.trim();
      if (valor === '') return 'Escribe el motivo de tu consulta.';
      if (valor.length < 5) return 'Describe el motivo con al menos 5 caracteres.';
      if (valor.length > 200) return 'El motivo no puede superar los 200 caracteres.';
      return '';
    }

    const camposConfig = [
      { campo: especialidad, validar: validarEspecialidad },
      { campo: medico, validar: validarMedico },
      { campo: fecha, validar: validarFecha },
      { campo: hora, validar: validarHora },
      { campo: nombre, validar: validarNombre },
      { campo: telefono, validar: validarTelefono },
      { campo: correo, validar: validarCorreo },
      { campo: documento, validar: validarDocumento },
      { campo: motivo, validar: validarMotivo },
    ].filter(item => item.campo !== null);

    function mostrarEstadoCampo(campo, mensaje) {
      const grupo = campo.closest('.grupo-campo');
      if (!grupo) return;
      const error = grupo.querySelector('.mensaje-error');

      if (mensaje) {
        grupo.classList.add('invalido');
        grupo.classList.remove('valido');
        if (error) error.textContent = mensaje;
      } else {
        grupo.classList.remove('invalido');
        if (campo.value !== '') {
          grupo.classList.add('valido');
        } else {
          grupo.classList.remove('valido');
        }
        if (error) error.textContent = '';
      }
    }

    function validarTodosLosCampos(mostrarErrores) {
      let todoValido = true;
      let primerCampoInvalido = null;

      camposConfig.forEach(({ campo, validar }) => {
        const mensaje = validar();
        if (mensaje) {
          todoValido = false;
          if (!primerCampoInvalido) primerCampoInvalido = campo;
        }
        if (mostrarErrores) mostrarEstadoCampo(campo, mensaje);
      });

      return { todoValido, primerCampoInvalido };
    }

    function calcularProgreso() {
      if (validarEspecialidad()) return 0;
      if (validarMedico()) return 1;
      if (validarFecha() || validarHora()) return 2;
      if (validarNombre() || validarTelefono() || validarCorreo() || validarDocumento() || validarMotivo()) return 3;
      return 4;
    }

    function actualizarPasos() {
      const progreso = calcularProgreso();

      pasos.forEach((paso, indice) => {
        paso.classList.remove('completado', 'activo');
        if (indice < progreso) {
          paso.classList.add('completado');
        } else if (indice === progreso) {
          paso.classList.add('activo');
        }
      });

      lineas.forEach((linea, indice) => {
        linea.classList.toggle('completada', indice < progreso);
      });
    }

    camposConfig.forEach(({ campo, validar }) => {
      const eventos = campo.tagName === 'SELECT' ? ['change'] : ['input', 'blur'];
      eventos.forEach((evento) => {
        campo.addEventListener(evento, function () {
          mostrarEstadoCampo(campo, validar());
          actualizarPasos();
        });
      });
    });

    formulario.addEventListener('submit', function (evento) {
      evento.preventDefault();

      const { todoValido, primerCampoInvalido } = validarTodosLosCampos(true);

      if (!todoValido) {
        primerCampoInvalido.focus();
        primerCampoInvalido.scrollIntoView({ behavior: 'smooth', block: 'center' });
        actualizarPasos();
        return;
      }

      actualizarPasos();
      alert('¡Tu cita ha sido agendada con éxito!');

      formulario.reset();
      camposConfig.forEach(({ campo }) => {
        const grupo = campo.closest('.grupo-campo');
        if (grupo) {
          grupo.classList.remove('invalido', 'valido');
          const error = grupo.querySelector('.mensaje-error');
          if (error) error.textContent = '';
        }
      });
      actualizarPasos();
    });

    actualizarPasos();
  }


  // ==========================================
  // 3. INICIO DE SESIÓN (LOGIN CON MYSQL)
  // ==========================================
  const formularioLogin = document.getElementById('iniciarsesion');

  if (formularioLogin) {
    formularioLogin.addEventListener('submit', async function (event) {
      event.preventDefault();

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
          sessionStorage.setItem('usuarioLogueado', JSON.stringify(datos.usuario));
          window.location.href = 'AgendarCita.html';
        } else {
          alert(datos.mensaje);
        }
      } catch (error) {
        console.error('Error de conexión:', error);
        alert('No se pudo conectar con el servidor Backend. Verifica que "node server.js" esté corriendo.');
      }
    });
  }


  // ==========================================
  // 4. LÓGICA PARA CERRAR SESIÓN
  // ==========================================
  const btnCerrarSesion = document.getElementById('boton-urgencias');

  if (btnCerrarSesion) {
    btnCerrarSesion.addEventListener('click', () => {
      const confirmar = confirm('¿Estás seguro de que deseas cerrar sesión?');

      if (confirmar) {
        sessionStorage.removeItem('usuarioLogueado');
        sessionStorage.clear();
        window.location.href = 'sesionCita.html';
      }
    });
  }

});