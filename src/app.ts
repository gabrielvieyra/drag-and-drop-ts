document.addEventListener('DOMContentLoaded', () => {
    mostrarEnPantallaFormulario();
    mostrarEnPantallaListaDeProyectos();
})

function mostrarEnPantallaListaDeProyectos() {
    crearProyecto('proyectos activos', 'active');
    crearProyecto('proyectos terminados', 'finished');
}

function crearProyecto(titulo: string, id: string) {
    const contenedor = document.querySelector('#app') as HTMLDivElement;
    const templateElement = document.querySelector('#project-list') as HTMLTemplateElement;
    const importarNode = document.importNode(templateElement.content, true);
    const proyecto = importarNode.firstElementChild as HTMLElement;
    proyecto.setAttribute('id', `${id}-projects`);
    const elementosProyecto = proyecto.children;
    const elementosProyectoHeader = elementosProyecto[0].children;
    elementosProyectoHeader[0].textContent = `${titulo.toUpperCase()}`;
    elementosProyecto[1].setAttribute('id', `${id}-projects-list`); 
    contenedor.appendChild(proyecto);
}

function mostrarEnPantallaFormulario() {
    const templateElement = document.querySelector('#project-input') as HTMLTemplateElement;
    const contenedor = document.querySelector('#app') as HTMLDivElement;

    contenedor.innerHTML = templateElement.innerHTML;

    const formulario = document.querySelector('form') as HTMLFormElement;
    formulario.setAttribute('id', 'user-input');

    formulario.addEventListener('submit', enviarFormulario);
}

function enviarFormulario(e: Event) {
    e.preventDefault();

    const inputTitulo = document.querySelector('#title') as HTMLInputElement;
    const textAreaDescripcion = document.querySelector('#description') as HTMLTextAreaElement;
    const inputGente = document.querySelector('#people') as HTMLInputElement;
    const inputUsuario = validarFormulario(inputTitulo, textAreaDescripcion, inputGente);

    if(Array.isArray(inputUsuario)) {
        const [titulo, descripcion, gente] = inputUsuario;
        console.log(titulo, descripcion, gente);

        limpiarInputs(inputTitulo, textAreaDescripcion, inputGente);
    }
}

function validarFormulario(inputUno: HTMLInputElement, textArea: HTMLTextAreaElement, inputDos: HTMLInputElement): [string, string, number] | void {
    const validacionTitulo: Validacion = {
        value: inputUno.value,
        required: true
    };

    const validacionDescripcion: Validacion = {
        value: textArea.value,
        required: true,
        minLenght: 5
    };

    const validacionGente: Validacion = {
        value: Number(inputDos.value),
        required: true,
        min: 1,
        max: 5
    };

    if(!validacion(validacionTitulo) || !validacion(validacionDescripcion) || !validacion(validacionGente)) {
        alert('Input invalido, por favor intente otra vez!');
        return;
    }else {
        return [inputUno.value, textArea.value, Number(inputDos.value)];
    }
}

function validacion(validarInput: Validacion){
    let esValido = true;

    if(validarInput.required) {
        esValido = esValido && validarInput.value.toString().trim().length !== 0;
    }
    if(validarInput.minLenght != null && typeof validarInput.value === 'string') {
        esValido = esValido && validarInput.value.length >= validarInput.minLenght;
    }
    if(validarInput.maxLenght != null && typeof validarInput.value === 'string') {
        esValido = esValido && validarInput.value.length <= validarInput.maxLenght;
    }
    if(validarInput.min != null && typeof validarInput.value === 'number') {
        esValido = esValido && validarInput.value >= validarInput.min;
    }
    if(validarInput.max != null && typeof validarInput.value === 'number') {
        esValido = esValido && validarInput.value <= validarInput.max;
    }
    return esValido;
}

function limpiarInputs(inputUno: HTMLInputElement, textArea: HTMLTextAreaElement, inputDos: HTMLInputElement) {
    inputUno.value = '';
    textArea.value = '';
    inputDos.value = '';
}

interface Validacion {
    value: string | number;
    required?: boolean;
    minLenght?: number;
    maxLenght?: number;
    min?: number;
    max?: number;
  }





