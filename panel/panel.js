"use strict";


/* =========================================================
   CONFIGURACIÓN
========================================================= */

const CLAVE_DATOS =
    "hospitalVidaDatos";

const CLAVE_TEMA =
    "hospitalVidaTema";


let datos;

let recursoActual = null;

let idEditando = null;

let funcionConfirmacion = null;

let temporizadorToast = null;



/* =========================================================
   DATOS INICIALES
========================================================= */

const datosIniciales = {

    institucion: {

        descripcion:
            "Hospital Vida nació con el propósito de brindar atención médica humana, segura y de alta calidad. Nuestro equipo combina experiencia, tecnología y empatía para acompañar a cada paciente."

    },


    pacientes: [

        {
            id:1,
            nombre:"María López",
            documento:"CC 10203040",
            telefono:"3005551001",
            correo:"maria@email.com",
            estado:"Activo"
        },

        {
            id:2,
            nombre:"Carlos Ramírez",
            documento:"CC 20304050",
            telefono:"3015551002",
            correo:"carlos@email.com",
            estado:"Activo"
        },

        {
            id:3,
            nombre:"Ana Torres",
            documento:"CC 30405060",
            telefono:"3025551003",
            correo:"ana@email.com",
            estado:"Activo"
        }

    ],


    citas: [

        {
            id:1,
            paciente:"María López",
            medico:"Dr. Carlos Ramírez",
            fecha:"2026-08-12",
            hora:"10:30",
            especialidad:"Cardiología",
            estado:"Confirmada"
        },

        {
            id:2,
            paciente:"Carlos Ramírez",
            medico:"Dra. Laura Gómez",
            fecha:"2026-08-12",
            hora:"11:30",
            especialidad:"Medicina Interna",
            estado:"Pendiente"
        }

    ],


    medicos: [

        {
            id:1,
            nombre:"Dr. Juan Pérez",
            especialidad:"Medicina General",
            telefono:"3001111111",
            correo:"juan@hospitalvida.com",
            estado:"Activo"
        },

        {
            id:2,
            nombre:"Dra. Laura Gómez",
            especialidad:"Medicina Interna",
            telefono:"3002222222",
            correo:"laura@hospitalvida.com",
            estado:"Activo"
        },

        {
            id:3,
            nombre:"Dr. Carlos Ramírez",
            especialidad:"Cardiología",
            telefono:"3003333333",
            correo:"carlos@hospitalvida.com",
            estado:"Activo"
        }

    ],


    servicios: [

        {
            id:1,
            nombre:"Consulta General",
            categoria:"Consulta",
            precio:80000,
            estado:"Activo"
        },

        {
            id:2,
            nombre:"Cardiología",
            categoria:"Especialidad",
            precio:150000,
            estado:"Activo"
        }

    ],


    facturacion: [

        {
            id:1,
            factura:"FV-001254",
            paciente:"María López",
            fecha:"2026-08-11",
            total:150000,
            estado:"Pagado"
        },

        {
            id:2,
            factura:"FV-001255",
            paciente:"Carlos Ramírez",
            fecha:"2026-08-11",
            total:80000,
            estado:"Pendiente"
        }

    ],


    historias: [

        {
            id:1,
            paciente:"María López",
            fecha:"2026-08-11",
            tipo:"Consulta",
            profesional:"Dr. Carlos Ramírez",
            estado:"Actualizada"
        }

    ],


    inventario: [

        {
            id:1,
            nombre:"Guantes de nitrilo",
            categoria:"Insumos",
            cantidad:250,
            minimo:100,
            estado:"Disponible"
        },

        {
            id:2,
            nombre:"Jeringas 5 ml",
            categoria:"Insumos",
            cantidad:80,
            minimo:100,
            estado:"Bajo"
        }

    ],


    usuarios: [

        {
            id:1,
            nombre:"Dr. Juan Pérez",
            correo:"juan@hospitalvida.com",
            rol:"Administrador",
            estado:"Activo"
        },

        {
            id:2,
            nombre:"Dra. Laura Gómez",
            correo:"laura@hospitalvida.com",
            rol:"Médico",
            estado:"Activo"
        }

    ],


    notificaciones: [

        {
            id:1,
            titulo:"Nueva cita agendada",
            detalle:"María López · Cardiología",
            hora:"10:30 AM",
            leida:false
        },

        {
            id:2,
            titulo:"Paciente registrado",
            detalle:"Carlos Ramírez",
            hora:"09:45 AM",
            leida:false
        },

        {
            id:3,
            titulo:"Historia clínica actualizada",
            detalle:"Ana Torres",
            hora:"08:50 AM",
            leida:false
        }

    ]

};



/* =========================================================
   CONFIGURACIÓN DE VISTAS
========================================================= */

const vistas = {

    dashboard:
        ["Dashboard",
        "Resumen general del hospital"],

    pacientes:
        ["Pacientes",
        "Administración de pacientes"],

    citas:
        ["Citas",
        "Agenda médica"],

    medicos:
        ["Médicos",
        "Profesionales registrados"],

    servicios:
        ["Servicios",
        "Servicios disponibles"],

    facturacion:
        ["Facturación",
        "Facturas registradas"],

    historias:
        ["Historia Clínica",
        "Registros clínicos"],

    reportes:
        ["Reportes",
        "Indicadores del hospital"],

    inventario:
        ["Inventario",
        "Control de existencias"],

    usuarios:
        ["Usuarios",
        "Usuarios del sistema"],

    "sobre-nosotros":
        ["Sobre Nosotros",
        "Conoce quiénes somos"],

    configuracion:
        ["Configuración",
        "Preferencias del sistema"]

};



/* =========================================================
   ESQUEMAS DE CRUD
========================================================= */

const esquemas = {

    pacientes:{

        columnas:[
            "nombre",
            "documento",
            "telefono",
            "correo",
            "estado"
        ],

        etiquetas:{
            nombre:"Paciente",
            documento:"Documento",
            telefono:"Teléfono",
            correo:"Correo",
            estado:"Estado"
        },

        campos:[
            ["nombre","Nombre completo","text"],
            ["documento","Documento","text"],
            ["telefono","Teléfono","tel"],
            ["correo","Correo electrónico","email"],
            ["estado","Estado","select",
                ["Activo","Inactivo"]]
        ]

    },


    citas:{

        columnas:[
            "paciente",
            "medico",
            "fecha",
            "hora",
            "especialidad",
            "estado"
        ],

        etiquetas:{
            paciente:"Paciente",
            medico:"Médico",
            fecha:"Fecha",
            hora:"Hora",
            especialidad:"Especialidad",
            estado:"Estado"
        },

        campos:[
            ["paciente","Paciente","text"],
            ["medico","Médico","text"],
            ["fecha","Fecha","date"],
            ["hora","Hora","time"],
            ["especialidad","Especialidad","text"],
            ["estado","Estado","select",
                [
                    "Confirmada",
                    "Pendiente",
                    "Cancelada"
                ]]
        ]

    },


    medicos:{

        columnas:[
            "nombre",
            "especialidad",
            "telefono",
            "correo",
            "estado"
        ],

        etiquetas:{
            nombre:"Médico",
            especialidad:"Especialidad",
            telefono:"Teléfono",
            correo:"Correo",
            estado:"Estado"
        },

        campos:[
            ["nombre","Nombre completo","text"],
            ["especialidad","Especialidad","text"],
            ["telefono","Teléfono","tel"],
            ["correo","Correo electrónico","email"],
            ["estado","Estado","select",
                ["Activo","Inactivo"]]
        ]

    },


    servicios:{

        columnas:[
            "nombre",
            "categoria",
            "precio",
            "estado"
        ],

        etiquetas:{
            nombre:"Servicio",
            categoria:"Categoría",
            precio:"Precio",
            estado:"Estado"
        },

        campos:[
            ["nombre","Nombre","text"],
            ["categoria","Categoría","text"],
            ["precio","Precio","number"],
            ["estado","Estado","select",
                ["Activo","Inactivo"]]
        ]

    },


    facturacion:{

        columnas:[
            "factura",
            "paciente",
            "fecha",
            "total",
            "estado"
        ],

        etiquetas:{
            factura:"Factura",
            paciente:"Paciente",
            fecha:"Fecha",
            total:"Total",
            estado:"Estado"
        },

        campos:[
            ["factura","Número de factura","text"],
            ["paciente","Paciente","text"],
            ["fecha","Fecha","date"],
            ["total","Total","number"],
            ["estado","Estado","select",
                ["Pagado","Pendiente","Anulado"]]
        ]

    },


    historias:{

        columnas:[
            "paciente",
            "fecha",
            "tipo",
            "profesional",
            "estado"
        ],

        etiquetas:{
            paciente:"Paciente",
            fecha:"Fecha",
            tipo:"Tipo",
            profesional:"Profesional",
            estado:"Estado"
        },

        campos:[
            ["paciente","Paciente","text"],
            ["fecha","Fecha","date"],
            ["tipo","Tipo","text"],
            ["profesional","Profesional","text"],
            ["estado","Estado","select",
                ["Actualizada","Pendiente"]]
        ]

    },


    inventario:{

        columnas:[
            "nombre",
            "categoria",
            "cantidad",
            "minimo",
            "estado"
        ],

        etiquetas:{
            nombre:"Producto",
            categoria:"Categoría",
            cantidad:"Cantidad",
            minimo:"Mínimo",
            estado:"Estado"
        },

        campos:[
            ["nombre","Producto","text"],
            ["categoria","Categoría","text"],
            ["cantidad","Cantidad","number"],
            ["minimo","Stock mínimo","number"],
            ["estado","Estado","select",
                [
                    "Disponible",
                    "Bajo",
                    "Agotado"
                ]]
        ]

    },


    usuarios:{

        columnas:[
            "nombre",
            "correo",
            "rol",
            "estado"
        ],

        etiquetas:{
            nombre:"Usuario",
            correo:"Correo",
            rol:"Rol",
            estado:"Estado"
        },

        campos:[
            ["nombre","Nombre","text"],
            ["correo","Correo","email"],
            ["rol","Rol","select",
                [
                    "Administrador",
                    "Médico",
                    "Recepción",
                    "Enfermería"
                ]],
            ["estado","Estado","select",
                ["Activo","Inactivo"]]
        ]

    }

};



/* =========================================================
   INICIO
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    iniciarAplicacion
);


function iniciarAplicacion(){

    try{

        cargarDatos();

        configurarEventos();

        aplicarTema();

        renderizarNotificaciones();

        actualizarContadorNotificaciones();

        activarVista("sobre-nosotros");

        animarContadores();

        validarImagenes();

    }

    catch(error){

        console.error(error);

        mostrarToast(
            "Error",
            "No fue posible iniciar el panel.",
            "error"
        );

    }

}



/* =========================================================
   LOCAL STORAGE
========================================================= */

function cargarDatos(){

    try{

        const guardado =
            localStorage.getItem(
                CLAVE_DATOS
            );

        if(guardado){

            datos =
                JSON.parse(guardado);

        }

        else{

            datos =
                JSON.parse(
                    JSON.stringify(
                        datosIniciales
                    )
                );

            guardarDatos();

        }

    }

    catch(error){

        console.error(error);

        datos =
            JSON.parse(
                JSON.stringify(
                    datosIniciales
                )
            );

    }

}


function guardarDatos(){

    try{

        localStorage.setItem(
            CLAVE_DATOS,
            JSON.stringify(datos)
        );

    }

    catch(error){

        console.error(error);

        mostrarToast(
            "Error",
            "No se pudieron guardar los cambios.",
            "error"
        );

    }

}



/* =========================================================
   EVENTOS
========================================================= */

function configurarEventos(){


    /* NAVEGACIÓN */

    document
        .querySelectorAll("[data-vista]")
        .forEach(elemento =>{

            elemento.addEventListener(
                "click",
                evento =>{

                    evento.preventDefault();

                    activarVista(
                        elemento.dataset.vista
                    );

                    cerrarMenus();

                }
            );

        });



    /* MENÚ */

    document
        .getElementById("botonMenu")
        .addEventListener(
            "click",
            alternarMenu
        );


    document
        .getElementById("capaMenu")
        .addEventListener(
            "click",
            cerrarMenuMovil
        );



    /* TEMA */

    document
        .getElementById("botonTema")
        .addEventListener(
            "click",
            cambiarTema
        );



    /* NOTIFICACIONES */

    document
        .getElementById("botonNotificaciones")
        .addEventListener(
            "click",
            alternarNotificaciones
        );


    document
        .getElementById("cerrarNotificaciones")
        .addEventListener(
            "click",
            cerrarNotificaciones
        );


    document
        .getElementById("marcarNotificaciones")
        .addEventListener(
            "click",
            marcarNotificaciones
        );



    /* PERFIL */

    document
        .getElementById("botonAvatar")
        .addEventListener(
            "click",
            alternarPerfil
        );


    document
        .getElementById("botonPerfilLateral")
        .addEventListener(
            "click",
            alternarPerfil
        );



    /* BUSCADOR */

    document
        .getElementById("campoBusqueda")
        .addEventListener(
            "input",
            buscar
        );



    /* CTRL + K */

    document.addEventListener(
        "keydown",
        evento =>{

            if(
                (evento.ctrlKey ||
                 evento.metaKey) &&
                evento.key.toLowerCase()==="k"
            ){

                evento.preventDefault();

                document
                    .getElementById(
                        "campoBusqueda"
                    )
                    .focus();

            }


            if(evento.key==="Escape"){

                cerrarModal();

                cerrarConfirmacion();

                cerrarMenus();

            }

        }
    );



    /* MODAL */

    document
        .getElementById("cerrarModal")
        .addEventListener(
            "click",
            cerrarModal
        );


    document
        .getElementById("fondoModal")
        .addEventListener(
            "click",
            evento =>{

                if(
                    evento.target.id ===
                    "fondoModal"
                ){

                    cerrarModal();

                }

            }
        );



    /* TOAST */

    document
        .getElementById("cerrarToast")
        .addEventListener(
            "click",
            cerrarToast
        );



    /* CONFIRMACIÓN */

    document
        .getElementById("cancelarConfirmacion")
        .addEventListener(
            "click",
            cerrarConfirmacion
        );


    document
        .getElementById("aceptarConfirmacion")
        .addEventListener(
            "click",
            aceptarConfirmacion
        );



    /* SOBRE NOSOTROS */

    document
        .getElementById(
            "botonEditarInstitucion"
        )
        .addEventListener(
            "click",
            () =>
                abrirFormulario(
                    "institucion"
                )
        );


    document
        .getElementById("botonHistoria")
        .addEventListener(
            "click",
            () =>{

                mostrarToast(
                    "Nuestra historia",
                    "Hospital Vida trabaja para unir experiencia médica, tecnología y humanidad."
                );

            }
        );


    document
        .getElementById("botonContacto")
        .addEventListener(
            "click",
            () =>{

                mostrarToast(
                    "Contacto",
                    "Aquí puedes conectar tu página de contacto."
                );

            }
        );


    /* PERFIL */

    document
        .getElementById(
            "botonCerrarSesion"
        )
        .addEventListener(
            "click",
            () =>{

                mostrarToast(
                    "Sesión",
                    "El cierre de sesión real se conectará al backend."
                );

                cerrarMenus();

            }
        );


    /* AYUDA */

    document
        .getElementById("botonAyuda")
        .addEventListener(
            "click",
            () =>{

                mostrarToast(
                    "Ayuda",
                    "Usa el menú lateral para navegar y los botones Nuevo registro para administrar información."
                );

            }
        );

}



/* =========================================================
   ACTIVAR VISTA
========================================================= */

function activarVista(nombre){

    try{

        if(!vistas[nombre]){

            throw new Error(
                "La vista no existe."
            );

        }


        document
            .querySelectorAll(".vista")
            .forEach(vista =>{

                vista.classList.remove(
                    "activa"
                );

            });


        const vista =
            document.getElementById(
                `vista-${nombre}`
            );


        vista.classList.add(
            "activa"
        );


        document
            .querySelectorAll(
                ".elemento-menu"
            )
            .forEach(boton =>{

                boton.classList.toggle(
                    "activo",
                    boton.dataset.vista === nombre
                );

            });


        document
            .getElementById(
                "tituloVista"
            )
            .textContent =
                vistas[nombre][0];


        document
            .getElementById(
                "subtituloVista"
            )
            .textContent =
                vistas[nombre][1];


        if(nombre !== "sobre-nosotros"){

            renderizarVista(nombre);

        }


        if(
            nombre ===
            "sobre-nosotros"
        ){

            document
                .getElementById(
                    "textoInstitucion"
                )
                .textContent =
                    datos
                        .institucion
                        .descripcion;

            animarContadores();

        }


        window.scrollTo({
            top:0,
            behavior:"smooth"
        });

    }

    catch(error){

        console.error(error);

        mostrarToast(
            "Error",
            "No fue posible abrir esta sección.",
            "error"
        );

    }

}



/* =========================================================
   RENDERIZAR VISTAS
========================================================= */

function renderizarVista(nombre){

    if(nombre==="dashboard"){

        renderizarDashboard();

        return;

    }


    if(nombre==="reportes"){

        renderizarReportes();

        return;

    }


    if(nombre==="configuracion"){

        renderizarConfiguracion();

        return;

    }


    renderizarCRUD(nombre);

}



/* =========================================================
   CRUD
========================================================= */

function renderizarCRUD(nombre){

    const contenedor =
        document.getElementById(
            `vista-${nombre}`
        );


    const esquema =
        esquemas[nombre];


    if(!esquema){

        return;

    }


    const registros =
        datos[nombre] || [];


    contenedor.innerHTML = `

        <div class="vista-generica">

            <div class="cabecera-pagina">

                <div>

                    <span class="etiqueta">

                        <i class="fa-solid fa-layer-group"></i>

                        Gestión

                    </span>

                    <h2>
                        ${vistas[nombre][0]}
                    </h2>

                    <p>
                        ${vistas[nombre][1]}
                    </p>

                </div>


                <button
                    class="boton primario"
                    id="nuevoRegistro"
                >

                    <i class="fa-solid fa-plus"></i>

                    Nuevo registro

                </button>

            </div>



            <div class="tarjeta-panel">

                <div class="barra-herramientas">

                    <strong>
                        ${registros.length}
                        registros
                    </strong>


                    <div class="busqueda-tabla">

                        <input
                            id="busquedaTabla"
                            placeholder="Filtrar..."
                        >

                    </div>

                </div>



                <div class="tabla-contenedor">

                    <table class="tabla">

                        <thead>

                            <tr>

                                ${esquema.columnas
                                    .map(
                                        columna =>
                                        `<th>
                                            ${esquema.etiquetas[columna]}
                                        </th>`
                                    )
                                    .join("")
                                }

                                <th>
                                    Acciones
                                </th>

                            </tr>

                        </thead>


                        <tbody>

                            ${crearFilas(
                                nombre,
                                esquema,
                                registros
                            )}

                        </tbody>

                    </table>

                </div>

            </div>

        </div>
    `;



    document
        .getElementById(
            "nuevoRegistro"
        )
        .addEventListener(
            "click",
            () =>
                abrirFormulario(nombre)
        );



    document
        .getElementById(
            "busquedaTabla"
        )
        .addEventListener(
            "input",
            evento =>
                filtrarTabla(
                    evento.target.value
                )
        );



    contenedor
        .querySelectorAll(
            "[data-editar]"
        )
        .forEach(boton =>{

            boton.addEventListener(
                "click",
                () =>
                    abrirFormulario(
                        nombre,
                        Number(
                            boton.dataset.editar
                        )
                    )
            );

        });



    contenedor
        .querySelectorAll(
            "[data-eliminar]"
        )
        .forEach(boton =>{

            boton.addEventListener(
                "click",
                () =>
                    pedirConfirmacion(
                        nombre,
                        Number(
                            boton.dataset.eliminar
                        )
                    )
            );

        });

}



/* =========================================================
   CREAR FILAS
========================================================= */

function crearFilas(
    nombre,
    esquema,
    registros
){

    if(!registros.length){

        return `

            <tr>

                <td
                    colspan="${
                        esquema.columnas.length + 1
                    }"
                    style="text-align:center;padding:30px;color:#8792a4"
                >

                    No hay registros.

                </td>

            </tr>

        `;

    }


    return registros
        .map(registro =>`

            <tr>

                ${esquema.columnas
                    .map(
                        columna =>`

                            <td>

                                ${
                                    formatearCelda(
                                        columna,
                                        registro[columna]
                                    )
                                }

                            </td>

                        `
                    )
                    .join("")
                }


                <td>

                    <div class="acciones-tabla">

                        <button
                            class="boton-tabla"
                            data-editar="${registro.id}"
                            title="Editar"
                        >

                            <i class="fa-solid fa-pen"></i>

                        </button>


                        <button
                            class="boton-tabla eliminar"
                            data-eliminar="${registro.id}"
                            title="Eliminar"
                        >

                            <i class="fa-solid fa-trash"></i>

                        </button>

                    </div>

                </td>

            </tr>

        `)
        .join("");

}



/* =========================================================
   FORMATEAR CELDAS
========================================================= */

function formatearCelda(
    columna,
    valor
){

    if(
        columna ===
        "precio" ||
        columna ===
        "total"
    ){

        return `
            <strong>
                $ ${Number(
                    valor || 0
                ).toLocaleString("es-CO")}
            </strong>
        `;

    }


    if(columna==="estado"){

        const clase =
            String(valor)
                .toLowerCase()
                .replaceAll(
                    "á",
                    "a"
                );


        return `

            <span
                class="estado ${clase}"
            >

                ${esc(valor)}

            </span>

        `;

    }


    return esc(valor);

}



/* =========================================================
   FILTRAR
========================================================= */

function filtrarTabla(texto){

    const filas =
        document.querySelectorAll(
            ".vista.activa tbody tr"
        );


    texto =
        texto
            .toLowerCase()
            .trim();


    filas.forEach(fila =>{

        fila.style.display =
            fila.textContent
                .toLowerCase()
                .includes(texto)
                ? ""
                : "none";

    });

}



/* =========================================================
   FORMULARIOS
========================================================= */

function abrirFormulario(
    recurso,
    id = null
){

    recursoActual =
        recurso;

    idEditando =
        id;


    const modal =
        document.getElementById(
            "fondoModal"
        );


    const formulario =
        document.getElementById(
            "formularioModal"
        );


    if(recurso==="institucion"){

        document
            .getElementById(
                "subtituloModal"
            )
            .textContent =
                "Hospital Vida";


        document
            .getElementById(
                "tituloModal"
            )
            .textContent =
                "Editar información";


        formulario.innerHTML = `

            <div class="formulario">

                <div class="campo-formulario">

                    <label>
                        Descripción
                    </label>

                    <textarea
                        name="descripcion"
                        required
                    >${esc(
                        datos.institucion.descripcion
                    )}</textarea>

                </div>


                <div class="acciones-formulario">

                    <button
                        type="button"
                        class="boton secundario"
                        id="cancelarFormulario"
                    >
                        Cancelar
                    </button>


                    <button
                        class="boton primario"
                        type="submit"
                    >

                        <i class="fa-solid fa-floppy-disk"></i>

                        Guardar

                    </button>

                </div>

            </div>

        `;

    }

    else{

        const esquema =
            esquemas[recurso];


        const registro =
            id
                ? datos[recurso]
                    .find(
                        elemento =>
                            elemento.id === id
                    )
                : {};


        document
            .getElementById(
                "subtituloModal"
            )
            .textContent =
                vistas[recurso][0];


        document
            .getElementById(
                "tituloModal"
            )
            .textContent =
                id
                    ? "Editar registro"
                    : "Nuevo registro";


        formulario.innerHTML = `

            <div class="formulario">

                ${esquema.campos
                    .map(
                        campo =>
                            crearCampo(
                                campo,
                                registro[campo[0]]
                            )
                    )
                    .join("")
                }


                <div class="acciones-formulario">

                    <button
                        type="button"
                        class="boton secundario"
                        id="cancelarFormulario"
                    >

                        Cancelar

                    </button>


                    <button
                        class="boton primario"
                        type="submit"
                    >

                        <i class="fa-solid fa-floppy-disk"></i>

                        Guardar

                    </button>

                </div>

            </div>

        `;

    }


    formulario.onsubmit =
        guardarFormulario;


    const cancelar =
        document.getElementById(
            "cancelarFormulario"
        );


    if(cancelar){

        cancelar.addEventListener(
            "click",
            cerrarModal
        );

    }


    modal.classList.add(
        "mostrar"
    );

}



/* =========================================================
   CREAR CAMPO
========================================================= */

function crearCampo(
    campo,
    valor = ""
){

    const [
        nombre,
        etiqueta,
        tipo,
        opciones
    ] = campo;


    if(tipo==="select"){

        return `

            <div class="campo-formulario">

                <label>
                    ${etiqueta}
                </label>

                <select
                    name="${nombre}"
                    required
                >

                    ${opciones
                        .map(
                            opcion =>`

                                <option
                                    ${
                                        String(valor) ===
                                        opcion
                                            ? "selected"
                                            : ""
                                    }
                                >

                                    ${opcion}

                                </option>

                            `
                        )
                        .join("")
                    }

                </select>

            </div>

        `;

    }


    return `

        <div class="campo-formulario">

            <label>
                ${etiqueta}
            </label>

            <input
                name="${nombre}"
                type="${tipo}"
                value="${esc(valor || "")}"
                required
            >

        </div>

    `;

}



/* =========================================================
   GUARDAR FORMULARIO
========================================================= */

function guardarFormulario(evento){

    evento.preventDefault();


    try{

        const formulario =
            new FormData(
                evento.target
            );


        if(
            recursoActual ===
            "institucion"
        ){

            const descripcion =
                String(
                    formulario.get(
                        "descripcion"
                    )
                ).trim();


            if(
                descripcion.length < 20
            ){

                throw new Error(
                    "La descripción es demasiado corta."
                );

            }


            datos
                .institucion
                .descripcion =
                    descripcion;


            guardarDatos();

            document
                .getElementById(
                    "textoInstitucion"
                )
                .textContent =
                    descripcion;


            cerrarModal();


            mostrarToast(
                "Guardado",
                "La información fue actualizada."
            );


            return;

        }



        const objeto = {};


        formulario.forEach(
            (valor,
            clave) =>{

                objeto[clave] =
                    valor;

            }
        );



        [
            "precio",
            "total",
            "cantidad",
            "minimo"
        ]
        .forEach(campo =>{

            if(
                campo in objeto
            ){

                objeto[campo] =
                    Number(
                        objeto[campo]
                    );

            }

        });



        if(idEditando){

            objeto.id =
                idEditando;


            const posicion =
                datos[
                    recursoActual
                ].findIndex(
                    elemento =>
                        elemento.id ===
                        idEditando
                );


            if(posicion < 0){

                throw new Error(
                    "No se encontró el registro."
                );

            }


            datos[
                recursoActual
            ][posicion] =
                objeto;


            mostrarToast(
                "Actualizado",
                "El registro fue actualizado."
            );

        }

        else{

            objeto.id =
                nuevoId(
                    recursoActual
                );


            datos[
                recursoActual
            ].push(objeto);


            mostrarToast(
                "Creado",
                "El registro fue creado correctamente."
            );

        }


        guardarDatos();

        cerrarModal();

        renderizarVista(
            recursoActual
        );

    }

    catch(error){

        console.error(error);

        mostrarToast(
            "Error",
            error.message,
            "error"
        );

    }

}



/* =========================================================
   NUEVO ID
========================================================= */

function nuevoId(recurso){

    return (

        datos[recurso]
            .reduce(
                (
                    mayor,
                    elemento
                ) =>
                    Math.max(
                        mayor,
                        elemento.id
                    ),
                0
            )

    ) + 1;

}



/* =========================================================
   ELIMINAR
========================================================= */

function pedirConfirmacion(
    recurso,
    id
){

    const registro =
        datos[recurso]
            .find(
                elemento =>
                    elemento.id === id
            );


    if(!registro){

        mostrarToast(
            "Error",
            "Registro no encontrado.",
            "error"
        );

        return;

    }


    funcionConfirmacion =
        () =>
            eliminarRegistro(
                recurso,
                id
            );


    document
        .getElementById(
            "tituloConfirmacion"
        )
        .textContent =
            "¿Eliminar registro?";


    document
        .getElementById(
            "textoConfirmacion"
        )
        .textContent =
            "Esta acción eliminará el registro seleccionado.";


    document
        .getElementById(
            "fondoConfirmacion"
        )
        .classList.add(
            "mostrar"
        );

}


function aceptarConfirmacion(){

    if(
        typeof funcionConfirmacion ===
        "function"
    ){

        funcionConfirmacion();

    }


    cerrarConfirmacion();

}


function cerrarConfirmacion(){

    document
        .getElementById(
            "fondoConfirmacion"
        )
        .classList.remove(
            "mostrar"
        );


    funcionConfirmacion =
        null;

}


function eliminarRegistro(
    recurso,
    id
){

    try{

        const posicion =
            datos[recurso]
                .findIndex(
                    elemento =>
                        elemento.id === id
                );


        if(posicion < 0){

            throw new Error(
                "No se encontró el registro."
            );

        }


        datos[recurso]
            .splice(
                posicion,
                1
            );


        guardarDatos();

        renderizarVista(
            recurso
        );


        mostrarToast(
            "Eliminado",
            "El registro fue eliminado."
        );

    }

    catch(error){

        console.error(error);

        mostrarToast(
            "Error",
            "No se pudo eliminar.",
            "error"
        );

    }

}



/* =========================================================
   DASHBOARD
========================================================= */

function renderizarDashboard(){

    const vista =
        document.getElementById(
            "vista-dashboard"
        );


    const ingresos =
        datos.facturacion
            .reduce(
                (
                    total,
                    factura
                ) =>
                    total +
                    Number(
                        factura.total || 0
                    ),
                0
            );


    vista.innerHTML = `

        <div class="vista-generica">

            <div class="cabecera-pagina">

                <div>

                    <span class="etiqueta">

                        <i class="fa-solid fa-chart-line"></i>

                        Resumen

                    </span>

                    <h2>
                        Dashboard
                    </h2>

                    <p>
                        Resumen general del hospital.
                    </p>

                </div>


                <button
                    class="boton primario"
                    id="botonNuevaCita"
                >

                    <i class="fa-solid fa-calendar-plus"></i>

                    Nueva cita

                </button>

            </div>


            <div class="tarjetas-resumen">


                <div class="tarjeta resumen">

                    <span>
                        Pacientes
                    </span>

                    <strong>
                        ${datos.pacientes.length}
                    </strong>

                    <small>
                        Registrados
                    </small>

                </div>


                <div class="tarjeta resumen">

                    <span>
                        Citas
                    </span>

                    <strong>
                        ${datos.citas.length}
                    </strong>

                    <small>
                        Registradas
                    </small>

                </div>


                <div class="tarjeta resumen">

                    <span>
                        Médicos
                    </span>

                    <strong>
                        ${datos.medicos.length}
                    </strong>

                    <small>
                        Profesionales
                    </small>

                </div>


                <div class="tarjeta resumen">

                    <span>
                        Ingresos
                    </span>

                    <strong>
                        $ ${ingresos.toLocaleString("es-CO")}
                    </strong>

                    <small>
                        Facturación
                    </small>

                </div>

            </div>


            <div class="rejilla-dos">


                <div class="tarjeta bloque">

                    <div class="cabecera-seccion">

                        <div>

                            <span class="etiqueta">
                                Agenda
                            </span>

                            <h2>
                                Últimas citas
                            </h2>

                        </div>

                    </div>


                    <div class="tabla-contenedor">

                        <table class="tabla">

                            <thead>

                                <tr>

                                    <th>
                                        Paciente
                                    </th>

                                    <th>
                                        Médico
                                    </th>

                                    <th>
                                        Fecha
                                    </th>

                                    <th>
                                        Estado
                                    </th>

                                </tr>

                            </thead>


                            <tbody>

                                ${datos.citas
                                    .slice(-5)
                                    .reverse()
                                    .map(
                                        cita =>`

                                            <tr>

                                                <td>
                                                    ${esc(
                                                        cita.paciente
                                                    )}
                                                </td>

                                                <td>
                                                    ${esc(
                                                        cita.medico
                                                    )}
                                                </td>

                                                <td>
                                                    ${esc(
                                                        cita.fecha
                                                    )}
                                                </td>

                                                <td>
                                                    ${formatearCelda(
                                                        "estado",
                                                        cita.estado
                                                    )}
                                                </td>

                                            </tr>

                                        `
                                    )
                                    .join("")
                                }

                            </tbody>

                        </table>

                    </div>

                </div>



                <div class="tarjeta bloque">

                    <div class="cabecera-seccion">

                        <div>

                            <span class="etiqueta">
                                Inventario
                            </span>

                            <h2>
                                Productos bajos
                            </h2>

                        </div>

                    </div>


                    ${
                        datos.inventario
                            .filter(
                                producto =>
                                    producto.cantidad <=
                                    producto.minimo
                            )
                            .map(
                                producto =>`

                                    <div class="notificacion">

                                        <div class="icono naranja">

                                            <i class="fa-solid fa-box"></i>

                                        </div>

                                        <div>

                                            <strong>
                                                ${esc(
                                                    producto.nombre
                                                )}
                                            </strong>

                                            <span>
                                                ${producto.cantidad}
                                                unidades
                                            </span>

                                        </div>

                                    </div>

                                `
                            )
                            .join("")
                        ||
                        `
                            <p style="
                                font-size:11px;
                                color:#8792a4;
                            ">
                                No hay productos bajos.
                            </p>
                        `
                    }

                </div>

            </div>

        </div>

    `;


    document
        .getElementById(
            "botonNuevaCita"
        )
        .addEventListener(
            "click",
            () =>
                abrirFormulario(
                    "citas"
                )
        );

}



/* =========================================================
   REPORTES
========================================================= */

function renderizarReportes(){

    const vista =
        document.getElementById(
            "vista-reportes"
        );


    const total =
        datos.facturacion
            .reduce(
                (
                    suma,
                    factura
                ) =>
                    suma +
                    Number(
                        factura.total || 0
                    ),
                0
            );


    vista.innerHTML = `

        <div class="vista-generica">

            <div class="cabecera-pagina">

                <div>

                    <span class="etiqueta">

                        <i class="fa-solid fa-chart-pie"></i>

                        Indicadores

                    </span>

                    <h2>
                        Reportes
                    </h2>

                    <p>
                        Datos calculados automáticamente.
                    </p>

                </div>


                <button
                    class="boton secundario"
                    id="exportarCSV"
                >

                    <i class="fa-solid fa-download"></i>

                    Exportar CSV

                </button>

            </div>


            <div class="tarjetas-resumen">

                <div class="tarjeta resumen">

                    <span>
                        Pacientes
                    </span>

                    <strong>
                        ${datos.pacientes.length}
                    </strong>

                </div>


                <div class="tarjeta resumen">

                    <span>
                        Citas
                    </span>

                    <strong>
                        ${datos.citas.length}
                    </strong>

                </div>


                <div class="tarjeta resumen">

                    <span>
                        Médicos
                    </span>

                    <strong>
                        ${datos.medicos.length}
                    </strong>

                </div>


                <div class="tarjeta resumen">

                    <span>
                        Facturación
                    </span>

                    <strong>
                        $ ${total.toLocaleString("es-CO")}
                    </strong>

                </div>

            </div>


            <div class="tarjeta bloque">

                <div class="cabecera-seccion">

                    <div>

                        <span class="etiqueta">
                            Citas
                        </span>

                        <h2>
                            Estado de las citas
                        </h2>

                    </div>

                </div>


                ${crearBarraReporte(
                    "Confirmadas",
                    datos.citas.filter(
                        cita =>
                            cita.estado ===
                            "Confirmada"
                    ).length
                )}


                ${crearBarraReporte(
                    "Pendientes",
                    datos.citas.filter(
                        cita =>
                            cita.estado ===
                            "Pendiente"
                    ).length
                )}


                ${crearBarraReporte(
                    "Canceladas",
                    datos.citas.filter(
                        cita =>
                            cita.estado ===
                            "Cancelada"
                    ).length
                )}

            </div>

        </div>

    `;


    document
        .getElementById(
            "exportarCSV"
        )
        .addEventListener(
            "click",
            exportarCSV
        );

}


function crearBarraReporte(
    nombre,
    cantidad
){

    const total =
        datos.citas.length || 1;


    const porcentaje =
        Math.round(
            cantidad /
            total *
            100
        );


    return `

        <div style="
            display:flex;
            align-items:center;
            gap:12px;
            margin:15px 0;
            font-size:11px;
        ">

            <strong style="
                width:90px;
            ">

                ${nombre}

            </strong>


            <div style="
                flex:1;
                height:9px;
                background:var(--fondo);
                border-radius:20px;
                overflow:hidden;
            ">

                <div style="
                    width:${porcentaje}%;
                    height:100%;
                    background:var(--azul);
                "></div>

            </div>


            <span>
                ${cantidad}
            </span>

        </div>

    `;

}



/* =========================================================
   CONFIGURACIÓN
========================================================= */

function renderizarConfiguracion(){

    const vista =
        document.getElementById(
            "vista-configuracion"
        );


    const oscuro =
        document.body
            .classList
            .contains(
                "modo-oscuro"
            );


    vista.innerHTML = `

        <div class="vista-generica">

            <div class="cabecera-pagina">

                <div>

                    <span class="etiqueta">

                        <i class="fa-solid fa-gear"></i>

                        Sistema

                    </span>

                    <h2>
                        Configuración
                    </h2>

                    <p>
                        Preferencias del panel.
                    </p>

                </div>

            </div>


            <div class="configuracion-grid">


                <div class="menu-config">

                    <button
                        class="activo"
                    >

                        <i class="fa-solid fa-sliders"></i>

                        General

                    </button>


                    <button
                        id="restaurarDatos"
                    >

                        <i class="fa-solid fa-rotate-left"></i>

                        Restaurar demo

                    </button>


                    <button
                        id="exportarDatos"
                    >

                        <i class="fa-solid fa-download"></i>

                        Exportar datos

                    </button>


                    <button
                        id="importarDatos"
                    >

                        <i class="fa-solid fa-upload"></i>

                        Importar JSON

                    </button>


                    <input
                        type="file"
                        id="archivoImportar"
                        accept=".json"
                        hidden
                    >

                </div>



                <div class="form-config">

                    <h3>
                        Preferencias
                    </h3>


                    <div class="interruptor">

                        <div>

                            <span>
                                Modo oscuro
                            </span>

                            <small>
                                Cambia la apariencia.
                            </small>

                        </div>


                        <label class="switch">

                            <input
                                type="checkbox"
                                id="switchTema"
                                ${
                                    oscuro
                                        ? "checked"
                                        : ""
                                }
                            >

                            <span class="slider"></span>

                        </label>

                    </div>


                    <div class="interruptor">

                        <div>

                            <span>
                                Datos locales
                            </span>

                            <small>
                                Los datos se guardan en este navegador.
                            </small>

                        </div>


                        <i
                            class="fa-solid fa-check"
                            style="color:var(--verde)"
                        ></i>

                    </div>


                    <br>


                    <button
                        class="boton peligro"
                        id="borrarDatos"
                    >

                        <i class="fa-solid fa-trash"></i>

                        Borrar todos los datos

                    </button>

                </div>

            </div>

        </div>

    `;


    document
        .getElementById(
            "switchTema"
        )
        .addEventListener(
            "change",
            cambiarTema
        );


    document
        .getElementById(
            "exportarDatos"
        )
        .addEventListener(
            "click",
            exportarJSON
        );


    document
        .getElementById(
            "restaurarDatos"
        )
        .addEventListener(
            "click",
            () =>{

                confirmarFuncion(
                    "Restaurar datos",
                    "Se reemplazarán los datos actuales.",
                    () =>{

                        datos =
                            JSON.parse(
                                JSON.stringify(
                                    datosIniciales
                                )
                            );

                        guardarDatos();

                        renderizarConfiguracion();

                        mostrarToast(
                            "Restaurado",
                            "Datos de demostración recuperados."
                        );

                    }
                );

            }
        );


    document
        .getElementById(
            "borrarDatos"
        )
        .addEventListener(
            "click",
            () =>{

                confirmarFuncion(
                    "Borrar datos",
                    "Se eliminarán los registros guardados.",
                    () =>{

                        datos.pacientes=[];
                        datos.citas=[];
                        datos.medicos=[];
                        datos.servicios=[];
                        datos.facturacion=[];
                        datos.historias=[];
                        datos.inventario=[];
                        datos.usuarios=[];

                        guardarDatos();

                        mostrarToast(
                            "Datos eliminados",
                            "Los registros fueron eliminados."
                        );

                        renderizarConfiguracion();

                    }
                );

            }
        );


    document
        .getElementById(
            "importarDatos"
        )
        .addEventListener(
            "click",
            () =>
                document
                    .getElementById(
                        "archivoImportar"
                    )
                    .click()
        );


    document
        .getElementById(
            "archivoImportar"
        )
        .addEventListener(
            "change",
            importarJSON
        );

}



/* =========================================================
   EXPORTAR JSON
========================================================= */

function exportarJSON(){

    const contenido =
        JSON.stringify(
            datos,
            null,
            2
        );


    descargarArchivo(
        "hospital-vida-datos.json",
        contenido,
        "application/json"
    );


    mostrarToast(
        "Exportado",
        "Los datos fueron exportados."
    );

}



/* =========================================================
   IMPORTAR JSON
========================================================= */

function importarJSON(evento){

    const archivo =
        evento.target.files[0];


    if(!archivo){

        return;

    }


    const lector =
        new FileReader();


    lector.onload =
        function(evento){

            try{

                const nuevosDatos =
                    JSON.parse(
                        evento.target.result
                    );


                datos =
                    {
                        ...datos,
                        ...nuevosDatos
                    };


                guardarDatos();

                mostrarToast(
                    "Importado",
                    "Los datos fueron importados correctamente."
                );


                renderizarConfiguracion();

            }

            catch(error){

                console.error(error);

                mostrarToast(
                    "Error",
                    "El archivo JSON no es válido.",
                    "error"
                );

            }

        };


    lector.readAsText(
        archivo
    );

}



/* =========================================================
   CSV
========================================================= */

function exportarCSV(){

    const filas = [

        [
            "Nombre",
            "Documento",
            "Teléfono",
            "Correo",
            "Estado"
        ],

        ...datos.pacientes.map(
            paciente => [

                paciente.nombre,
                paciente.documento,
                paciente.telefono,
                paciente.correo,
                paciente.estado

            ]
        )

    ];


    const csv =
        filas
            .map(
                fila =>
                    fila
                        .map(
                            valor =>
                                `"${String(
                                    valor
                                ).replaceAll(
                                    '"',
                                    '""'
                                )}"`
                        )
                        .join(",")
            )
            .join("\n");


    descargarArchivo(
        "pacientes-hospital-vida.csv",
        csv,
        "text/csv"
    );


    mostrarToast(
        "Exportado",
        "Archivo CSV generado."
    );

}



/* =========================================================
   DESCARGAR ARCHIVO
========================================================= */

function descargarArchivo(
    nombre,
    contenido,
    tipo
){

    const archivo =
        new Blob(
            [contenido],
            {
                type:tipo
            }
        );


    const url =
        URL.createObjectURL(
            archivo
        );


    const enlace =
        document.createElement(
            "a"
        );


    enlace.href =
        url;


    enlace.download =
        nombre;


    document.body.appendChild(
        enlace
    );


    enlace.click();


    enlace.remove();


    URL.revokeObjectURL(
        url
    );

}



/* =========================================================
   BUSCADOR GLOBAL
========================================================= */

function buscar(evento){

    const texto =
        evento.target.value
            .trim()
            .toLowerCase();


    if(!texto){

        return;

    }


    const recursos =
        Object.keys(
            esquemas
        );


    const encontrado =
        recursos.find(
            recurso =>
                datos[recurso]
                    .some(
                        registro =>
                            Object
                                .values(
                                    registro
                                )
                                .join(" ")
                                .toLowerCase()
                                .includes(
                                    texto
                                )
                    )
        );


    if(encontrado){

        activarVista(
            encontrado
        );


        setTimeout(
            () =>{

                const campo =
                    document.querySelector(
                        ".vista.activa #busquedaTabla"
                    );


                if(campo){

                    campo.value =
                        texto;

                    filtrarTabla(
                        texto
                    );

                }

            },
            50
        );

    }

}



/* =========================================================
   NOTIFICACIONES
========================================================= */

function renderizarNotificaciones(){

    const contenedor =
        document.getElementById(
            "listaNotificaciones"
        );


    contenedor.innerHTML =
        datos.notificaciones
            .map(
                notificacion =>`

                    <div class="notificacion">

                        <div class="icono azul">

                            <i class="fa-solid fa-bell"></i>

                        </div>

                        <div>

                            <strong>
                                ${esc(
                                    notificacion.titulo
                                )}
                            </strong>

                            <span>
                                ${esc(
                                    notificacion.detalle
                                )}

                                ·

                                ${esc(
                                    notificacion.hora
                                )}
                            </span>

                        </div>

                    </div>

                `
            )
            .join("");

}


function actualizarContadorNotificaciones(){

    const cantidad =
        datos.notificaciones
            .filter(
                notificacion =>
                    !notificacion.leida
            )
            .length;


    document
        .getElementById(
            "contadorNotificaciones"
        )
        .textContent =
            cantidad;

}


function marcarNotificaciones(){

    datos.notificaciones
        .forEach(
            notificacion =>
                notificacion.leida =
                    true
        );


    guardarDatos();

    renderizarNotificaciones();

    actualizarContadorNotificaciones();


    mostrarToast(
        "Notificaciones",
        "Todas fueron marcadas como leídas."
    );

}



/* =========================================================
   TEMA
========================================================= */

function cambiarTema(){

    document
        .body
        .classList
        .toggle(
            "modo-oscuro"
        );


    const oscuro =
        document
            .body
            .classList
            .contains(
                "modo-oscuro"
            );


    localStorage.setItem(
        CLAVE_TEMA,
        oscuro
            ? "oscuro"
            : "claro"
    );


    document
        .querySelector(
            "#botonTema i"
        )
        .className =
            oscuro
                ? "fa-solid fa-sun"
                : "fa-solid fa-moon";

}


function aplicarTema(){

    const tema =
        localStorage.getItem(
            CLAVE_TEMA
        );


    if(
        tema ===
        "oscuro"
    ){

        document
            .body
            .classList
            .add(
                "modo-oscuro"
            );

    }


    document
        .querySelector(
            "#botonTema i"
        )
        .className =
            tema === "oscuro"
                ? "fa-solid fa-sun"
                : "fa-solid fa-moon";

}



/* =========================================================
   MENÚ
========================================================= */

function alternarMenu(){

    document
        .getElementById(
            "barraLateral"
        )
        .classList
        .toggle(
            "abierta"
        );


    document
        .getElementById(
            "capaMenu"
        )
        .classList
        .toggle(
            "activa"
        );

}


function cerrarMenuMovil(){

    document
        .getElementById(
            "barraLateral"
        )
        .classList
        .remove(
            "abierta"
        );


    document
        .getElementById(
            "capaMenu"
        )
        .classList
        .remove(
            "activa"
        );

}



/* =========================================================
   MENÚS FLOTANTES
========================================================= */

function alternarNotificaciones(){

    cerrarPerfil();


    document
        .getElementById(
            "painelNotificaciones"
        )
        .classList
        .toggle(
            "mostrar"
        );

}


function cerrarNotificaciones(){

    document
        .getElementById(
            "painelNotificaciones"
        )
        .classList
        .remove(
            "mostrar"
        );

}


function alternarPerfil(){

    cerrarNotificaciones();


    document
        .getElementById(
            "menuPerfil"
        )
        .classList
        .toggle(
            "mostrar"
        );

}


function cerrarMenus(){

    cerrarNotificaciones();


    document
        .getElementById(
            "menuPerfil"
        )
        .classList
        .remove(
            "mostrar"
        );


    cerrarMenuMovil();

}



/* =========================================================
   MODAL
========================================================= */

function cerrarModal(){

    document
        .getElementById(
            "fondoModal"
        )
        .classList
        .remove(
            "mostrar"
        );


    recursoActual =
        null;


    idEditando =
        null;

}



/* =========================================================
   CONFIRMACIÓN GENÉRICA
========================================================= */

function confirmarFuncion(
    titulo,
    texto,
    funcion
){

    funcionConfirmacion =
        funcion;


    document
        .getElementById(
            "tituloConfirmacion"
        )
        .textContent =
            titulo;


    document
        .getElementById(
            "textoConfirmacion"
        )
        .textContent =
            texto;


    document
        .getElementById(
            "fondoConfirmacion"
        )
        .classList
        .add(
            "mostrar"
        );

}



/* =========================================================
   TOAST
========================================================= */

function mostrarToast(
    titulo,
    texto,
    tipo="exito"
){

    const toast =
        document.getElementById(
            "toast"
        );


    document
        .getElementById(
            "toastTitulo"
        )
        .textContent =
            titulo;


    document
        .getElementById(
            "toastTexto"
        )
        .textContent =
            texto;


    toast
        .classList
        .remove(
            "error"
        );


    if(
        tipo ===
        "error"
    ){

        toast
            .classList
            .add(
                "error"
            );

    }


    toast
        .classList
        .add(
            "mostrar"
        );


    clearTimeout(
        temporizadorToast
    );


    temporizadorToast =
        setTimeout(
            cerrarToast,
            4500
        );

}


function cerrarToast(){

    document
        .getElementById(
            "toast"
        )
        .classList
        .remove(
            "mostrar"
        );

}



/* =========================================================
   CONTADORES
========================================================= */

function animarContadores(){

    document
        .querySelectorAll(
            "[data-contador]"
        )
        .forEach(
            elemento =>{

                if(
                    elemento.dataset.animado ===
                    "si"
                ){

                    return;

                }


                elemento.dataset.animado =
                    "si";


                const final =
                    Number(
                        elemento.dataset.contador
                    );


                let actual =
                    0;


                const intervalo =
                    setInterval(
                        () =>{

                            actual +=
                                Math.ceil(
                                    final /
                                    35
                                );


                            if(
                                actual >=
                                final
                            ){

                                actual =
                                    final;

                                clearInterval(
                                    intervalo
                                );

                            }


                            elemento.textContent =
                                actual.toLocaleString(
                                    "es-CO"
                                ) +
                                (
                                    final === 98
                                        ? "%"
                                        : ""
                                );

                        },
                        25
                    );

            }
        );

}



/* =========================================================
   IMÁGENES
========================================================= */

function validarImagenes(){

    document
        .querySelectorAll(
            "img"
        )
        .forEach(
            imagen =>{

                imagen.addEventListener(
                    "error",
                    () =>{

                        imagen.src =
                            "https://via.placeholder.com/700x450.png?text=Hospital+Vida";


                        imagen.alt =
                            "Imagen no disponible";

                    }
                );

            }
        );

}



/* =========================================================
   ESCAPAR HTML
========================================================= */

function esc(valor){

    return String(
        valor ?? ""
    )
    .replace(
        /[&<>"']/g,
        caracter =>({

            "&":"&amp;",
            "<":"&lt;",
            ">":"&gt;",
            '"':"&quot;",
            "'":"&#039;"

        }[caracter])
    );

}



/* =========================================================
   ERRORES GLOBALES
========================================================= */

window.addEventListener(
    "error",
    evento =>{

        console.error(
            evento.error ||
            evento.message
        );


        mostrarToast(
            "Error",
            "Ocurrió un error inesperado.",
            "error"
        );

    }
);


window.addEventListener(
    "unhandledrejection",
    evento =>{

        console.error(
            evento.reason
        );


        mostrarToast(
            "Error",
            "Una operación no pudo completarse.",
            "error"
        );

    }
);