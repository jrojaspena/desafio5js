const tareaInput = document.getElementById('nuevaTarea');
const btnAgregar = document.getElementById('agregarTarea');
const tabla = document.getElementById('tabla');
const tareasContadas = document.getElementById('tareasContadas');
const tareasRealizadas = document.getElementById('tareasRealizadas');
const nombreTareasIniciales = ['correr','caminar'];

let listaTareas = [];
let contadorId = 1;

function obtenerObjetoTarea(nombre) {
    return {
        id: contadorId,
        nombre: nombre,
        estado: false
    }
}

function agregarHtmlTareaATabla({id, nombre, estado}) {
    let html = `
        <tr id="${id}">
            <th scope="row"> ${id} </th>
            <td> ${nombre} </td>
            <td> 
                <input 
                    class="form-check-input" 
                    type="checkbox" 
                    value="" 
                    id="${id}" 
                    ${estado ? 'checked' : ''}
                    onclick="actualizarTarea(this)"
                >
            </td>
            <td> 
            <button type="button" onclick="eliminar(${id})" class="btn btn-success">x</button>
            </td>
        </tr>   
    `
    tabla.innerHTML += html;
}

function actualizarTarea({id, checked}) {
    const tarea = listaTareas.find((elemento) => elemento.id == id);
    tarea.estado = checked;
    actualizarContadores(); 
}

function actualizarContadores() {
    tareasRealizadas.textContent = listaTareas.filter((tarea) => tarea.estado).length;
    tareasContadas.textContent = listaTareas.length;
}

function eliminar(idFila) {
    document.getElementById(idFila).remove();
    const aEliminar = listaTareas.map((elemento) => elemento.id).indexOf(idFila);
    listaTareas.splice(aEliminar, 1);
    actualizarContadores();
}

function limpiarCampoTexto() {
    tareaInput.value = ""
}

function agregarTareaATabla(descripcionTarea) {
    if (descripcionTarea === '') {
        alert('ingresar tarea');
        return
    }
    
    if (descripcionTarea.trim() === '') {
        alert('no ingresar');
        limpiarCampoTexto();
        return
    }
    const tarea = obtenerObjetoTarea(descripcionTarea);
    listaTareas.push(tarea);
    agregarHtmlTareaATabla(tarea)
    contadorId++
    tareasContadas.textContent = listaTareas.length;
    limpiarCampoTexto();
}

const agregarTareasIniciales = () => {
    nombreTareasIniciales.forEach(agregarTareaATabla);
    tareasRealizadas.textContent = 0
}

btnAgregar.addEventListener('click', () => {
    agregarTareaATabla(tareaInput.value);
})

agregarTareasIniciales();