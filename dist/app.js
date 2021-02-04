"use strict";
document.addEventListener('DOMContentLoaded', () => {
    mostrarEnPantallaFormulario();
    mostrarEnPantallaListaDeProyectos();
});
function mostrarEnPantallaListaDeProyectos() {
    crearProyecto('proyectos activos', 'active');
    crearProyecto('proyectos terminados', 'finished');
}
function crearProyecto(titulo, id) {
    const contenedor = document.querySelector('#app');
    const templateElement = document.querySelector('#project-list');
    const importarNode = document.importNode(templateElement.content, true);
    const proyecto = importarNode.firstElementChild;
    proyecto.setAttribute('id', `${id}-projects`);
    const elementosProyecto = proyecto.children;
    const elementosProyectoHeader = elementosProyecto[0].children;
    elementosProyectoHeader[0].textContent = `${titulo.toUpperCase()}`;
    elementosProyecto[1].setAttribute('id', `${id}-projects-list`);
    contenedor.appendChild(proyecto);
}
function mostrarEnPantallaFormulario() {
    const templateElement = document.querySelector('#project-input');
    const contenedor = document.querySelector('#app');
    contenedor.innerHTML = templateElement.innerHTML;
    const formulario = document.querySelector('form');
    formulario.setAttribute('id', 'user-input');
    formulario.addEventListener('submit', enviarFormulario);
}
function enviarFormulario(e) {
    e.preventDefault();
    const inputTitulo = document.querySelector('#title');
    const textAreaDescripcion = document.querySelector('#description');
    const inputGente = document.querySelector('#people');
    const inputUsuario = validarFormulario(inputTitulo, textAreaDescripcion, inputGente);
    if (Array.isArray(inputUsuario)) {
        const [titulo, descripcion, numeroGente] = inputUsuario;
        agregarProyecto(titulo, descripcion, numeroGente);
        limpiarInputs(inputTitulo, textAreaDescripcion, inputGente);
    }
}
function validarFormulario(inputUno, textArea, inputDos) {
    const validacionTitulo = {
        value: inputUno.value,
        required: true
    };
    const validacionDescripcion = {
        value: textArea.value,
        required: true,
        minLenght: 5
    };
    const validacionGente = {
        value: Number(inputDos.value),
        required: true,
        min: 1,
        max: 5
    };
    if (!validacion(validacionTitulo) || !validacion(validacionDescripcion) || !validacion(validacionGente)) {
        alert('Input invalido, por favor intente otra vez!');
        return;
    }
    else {
        return [inputUno.value, textArea.value, Number(inputDos.value)];
    }
}
function validacion(validarInput) {
    let esValido = true;
    if (validarInput.required) {
        esValido = esValido && validarInput.value.toString().trim().length !== 0;
    }
    if (validarInput.minLenght != null && typeof validarInput.value === 'string') {
        esValido = esValido && validarInput.value.length >= validarInput.minLenght;
    }
    if (validarInput.maxLenght != null && typeof validarInput.value === 'string') {
        esValido = esValido && validarInput.value.length <= validarInput.maxLenght;
    }
    if (validarInput.min != null && typeof validarInput.value === 'number') {
        esValido = esValido && validarInput.value >= validarInput.min;
    }
    if (validarInput.max != null && typeof validarInput.value === 'number') {
        esValido = esValido && validarInput.value <= validarInput.max;
    }
    return esValido;
}
function limpiarInputs(inputUno, textArea, inputDos) {
    inputUno.value = '';
    textArea.value = '';
    inputDos.value = '';
}
function agregarProyecto(titulo, descripcion, numeroGente) {
    const listaProyecto = document.querySelector('#active-projects-list');
    const templateElement = document.querySelector('#single-project');
    const importarNode = document.importNode(templateElement.content, true);
    const proyecto = importarNode.firstElementChild;
    proyecto.children[0].textContent = `${titulo}`;
    proyecto.children[2].textContent = `${descripcion}`;
    const numeroGenteProyecto = proyecto.children[1];
    if (Number(`${numeroGente}`) === 1) {
        numeroGenteProyecto.textContent = `${numeroGente} persona trabajando`;
    }
    else {
        numeroGenteProyecto.textContent = `${numeroGente} personas trabajando`;
    }
    listaProyecto.appendChild(proyecto);
}
