let proyectos: HTMLElement[] = [];

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
    const id = Math.random();
    const inputUsuario = validarFormulario(inputTitulo, textAreaDescripcion, inputGente, id);

    if(Array.isArray(inputUsuario)) {
        const [titulo, descripcion, numeroGente, id] = inputUsuario;
       
        agregarProyecto(titulo, descripcion, numeroGente, id);
        
        limpiarInputs(inputTitulo, textAreaDescripcion, inputGente);
    }
}

function validarFormulario(inputUno: HTMLInputElement, textArea: HTMLTextAreaElement, inputDos: HTMLInputElement, id: number): [string, string, number, number] | void {
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
        return [inputUno.value, textArea.value, Number(inputDos.value), id];
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

function agregarProyecto(titulo: string, descripcion: string, numeroGente: number, id: number) {
        const templateElement = document.querySelector('#single-project') as HTMLTemplateElement;
        const importarNode = document.importNode(templateElement.content, true);
        const proyecto = importarNode.firstElementChild as HTMLElement;
        proyecto.setAttribute('id', `${id}`);
        proyecto.children[0].setAttribute('data-id', `${id}`);
        proyecto.children[1].textContent = `${titulo}`;
        proyecto.children[3].textContent = `${descripcion}`;
        const numeroGenteProyecto = proyecto.children[2];
        
        if(Number(`${numeroGente}`) === 1) {
            numeroGenteProyecto.textContent = `${numeroGente} persona trabajando`;
        }else {
            numeroGenteProyecto.textContent = `${numeroGente} personas trabajando`;          
        }

        proyectos = [...proyectos, proyecto];
        
        mostrarProyectosEnPantalla(proyectos);
}

function mostrarProyectosEnPantalla(proyectos: HTMLElement[]) {
    const listaProyecto = document.querySelector('#active-projects-list') as HTMLElement;

    proyectos.forEach(proyecto => {
        listaProyecto.appendChild(proyecto);
    })

    const contenedorProyectosActivos = document.querySelector('#active-projects-list') as HTMLElement;
    contenedorProyectosActivos.addEventListener('click', eliminarProyectos);
};

function eliminarProyectos(e: Event) {
    const elementosProyecto = e.target as HTMLElement;
    
    if(elementosProyecto.classList.contains('material-icons')) {
        const idProyecto = elementosProyecto.getAttribute('data-id');

        proyectos.forEach(proyecto => {
            if(proyecto.id === idProyecto) {
                mostrarProyectosTerminados(proyecto);
            }
        })
        
        proyectos = proyectos.filter(proyecto => proyecto.id !== idProyecto);

        limpiarPantalla();
        mostrarProyectosEnPantalla(proyectos);
    }
}

function limpiarPantalla() {
    const listaProyectosActivos = document.querySelector('#active-projects-list') as HTMLElement;
    listaProyectosActivos.innerHTML = '';
}

function mostrarProyectosTerminados(proyecto: HTMLElement) {
    const listaProyectoTerminados = document.querySelector('#finished-projects-list') as HTMLElement;
    proyecto.children[0].classList.add('esconder');

    listaProyectoTerminados.appendChild(proyecto);
}





