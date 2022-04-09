"use strict";

const url = 'https://60d780fb307c300017a5f8d7.mockapi.io/api/productos';
let btnAgregar = document.querySelector("#btn-agregar").addEventListener("click", agregarFila);
let btnFiltrar = document.querySelector("#btn-filtrar").addEventListener("click", filtrarTabla);
let btnAgregar3 = document.querySelector("#btn-agregar3").addEventListener("click", agregar3Filas);

obtenerDatos();

async function obtenerDatos() {
    document.getElementById("tbody").innerHTML = "";

    try {
        let respuesta = await fetch(url);
        let json = await respuesta.json();
        actualizarTabla(json);
    }
    catch (error) {
        console.log(error);
    }
}

function actualizarTabla(json) {
    document.getElementById("tbody").innerHTML = "";

    for (let i = 0; i < json.length; i++) {
        let item = json[i];

        let filaProducto = document.createElement("tr");
        filaProducto.classList.add(`fila-${i + 1}`);
        let celdaHamburguesa = document.createElement("td");
        celdaHamburguesa.innerHTML = item.nombre;
        let inputEditarNombre = document.createElement("input");
        inputEditarNombre.type = "text";
        inputEditarNombre.setAttribute("inp-editar-nombre", item.id);
        inputEditarNombre.classList.add("editar-nombre-ocultar");
        celdaHamburguesa.appendChild(inputEditarNombre);
        filaProducto.appendChild(celdaHamburguesa);

        let celdaPrecio = document.createElement("td");
        celdaPrecio.innerHTML = item.precio;
        let inputEditarPrecio = document.createElement("input");
        inputEditarPrecio.type = "number";
        inputEditarPrecio.setAttribute("inp-editar-precio", item.id);
        inputEditarPrecio.classList.add("editar-precio-ocultar");
        celdaPrecio.appendChild(inputEditarPrecio);
        filaProducto.appendChild(celdaPrecio);

        let celdaGuarnicion = document.createElement("td");
        celdaGuarnicion.innerHTML = item.masguarnicion;
        filaProducto.appendChild(celdaGuarnicion);

        let celdaBebida = document.createElement("td");
        celdaBebida.innerHTML = item.masbebida;
        filaProducto.appendChild(celdaBebida);

        crearBotones(filaProducto, item.id);
        document.getElementById("tbody").appendChild(filaProducto);
        resaltar(filaProducto, item.precio);
    }
}

function resaltar(fila, precio) {
    if (precio <= 500) {
        fila.classList.toggle("resaltar");
    }
    else {
        fila.classList.toggle("noresaltar");
    }
}

function crearBotones(filaProducto, id) {
    let celdaBotones = document.createElement("td");
    let botonEliminar = document.createElement("button");
    botonEliminar.innerHTML = "Eliminar";
    let botonEditar = document.createElement("button");
    botonEditar.innerHTML = "Editar";

    celdaBotones.appendChild(botonEliminar);
    celdaBotones.appendChild(botonEditar);
    filaProducto.appendChild(celdaBotones);

    botonEliminar.setAttribute("id-boton-eliminar", id);
    botonEliminar.addEventListener("click", eliminarFila);

    botonEditar.setAttribute("id-boton-editar", id);
    botonEditar.addEventListener("click", editarFila);
}

async function agregarFila() {
    let compCampo = document.querySelector(".comp-campo");
    let nombre = document.querySelector("#text-producto").value;
    let precio = document.querySelector("#text-precio").value;
    let producto = {
        "nombre": nombre,
        "precio": precio,
        "masguarnicion": Number(precio) + 60,
        "masbebida": Number(precio) + 90
    }

    try {
        let respuesta = await fetch(url, {
            "method": "POST",
            "headers": { "Content-type": "application/json" },
            "body": JSON.stringify(producto)
        });
        if (respuesta.status === 201) {
            compCampo.innerHTML = "Agregado!";
            setTimeout(function limpiarCampo() {
                compCampo.innerHTML = "";
            }, 5000);

            obtenerDatos();
        }
    }
    catch (error) {
        console.log(error);
    }
}

function agregar3Filas() {
    agregarFila();
    setTimeout(agregarFila, 1000);
    setTimeout(agregarFila, 2000);
}

async function eliminarFila() {
    let compCampo = document.querySelector(".comp-campo");
    let id = this.getAttribute("id-boton-eliminar");
    try {
        let respuesta = await fetch(`${url}/${id}`, {
            "method": "DELETE"
        });
        if (respuesta.status === 200) {
            compCampo.innerHTML = "Eliminado!";
            setTimeout(function limpiarCampo() {
                compCampo.innerHTML = "";
            }, 5000);

            obtenerDatos();
        }
    }
    catch (error) {
        console.log(error);
    }
}

async function editarFila() {
    let id = this.getAttribute("id-boton-editar");
    let inputEditarNombre = document.querySelector(`input[inp-editar-nombre='${id}']`);
    let inputEditarPrecio = document.querySelector(`input[inp-editar-precio='${id}']`);
    let compCampo = document.querySelector(".comp-campo");

    inputEditarNombre.classList.toggle("editar-nombre-mostrar");
    inputEditarNombre.classList.toggle("editar-nombre-ocultar");
    inputEditarPrecio.classList.toggle("editar-precio-mostrar");
    inputEditarPrecio.classList.toggle("editar-precio-ocultar");

    if (this.innerHTML == "Editar") {
        this.innerHTML = "Confirmar";
    }
    else {
        this.innerHTML = "Editar";
    }

    let productoNuevo = {
        "nombre": inputEditarNombre.value,
        "precio": inputEditarPrecio.value,
        "masguarnicion": Number(inputEditarPrecio.value) + 60,
        "masbebida": Number(inputEditarPrecio.value) + 90
    }

    try {
        if (inputEditarNombre.value != "" && inputEditarPrecio.value != "") {
            let respuesta = await fetch(`${url}/${id}`, {
                "method": "PUT",
                "headers": { "Content-type": "application/json" },
                "body": JSON.stringify(productoNuevo)
            });
            if (respuesta.status === 200) {
                compCampo.innerHTML = "La modificacion se realizo con exito!";
                setTimeout(function limpiarCampo() {
                    compCampo.innerHTML = "";
                }, 5000);

                obtenerDatos();
            }
        }
        else {
            compCampo.innerHTML = "Complete todos los campos para confirmar los cambios";
            setTimeout(function limpiarCampo() {
                compCampo.innerHTML = "";
            }, 10000);
        }
    }
    catch (error) {
        console.log(error);
    }
}

function filtrarTabla() {
    let contenedor = document.querySelector("#tbody");
    let selectFiltro = document.querySelector("#filtro-tabla");
    let filasTabla = contenedor.getElementsByTagName("tr");
    let arregloTr = Array.from(filasTabla);

    arregloTr.forEach(fila => {
        let trPrecio = (Number(fila.firstElementChild.nextElementSibling.innerText));
        if ((selectFiltro.value == "Hasta $500") && ((trPrecio > 500))) {
            fila.classList.add("fila-ocultar");
        }
        if ((selectFiltro.value == "Hasta $800") && (trPrecio > 800)) {
            fila.classList.add("fila-ocultar");
        }
        if ((selectFiltro.value == "Hasta $800") && (trPrecio <= 800)) {
            fila.classList.remove("fila-ocultar");
        }
        if ((selectFiltro.value == "Hasta $1000") && (trPrecio > 1000)) {
            fila.classList.add("fila-ocultar");
        }
        if ((selectFiltro.value == "Hasta $1000") && (trPrecio <= 1000)) {
            fila.classList.remove("fila-ocultar");
        }
        if (selectFiltro.value == "Mostrar todos") {
            fila.classList.remove("fila-ocultar");
        }
    });
}
