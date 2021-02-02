document.addEventListener('DOMContentLoaded', () => {
    const templateElement = document.querySelector('#project-input') as HTMLTemplateElement;
    const contenedor = document.querySelector('#app') as HTMLDivElement;

    contenedor.innerHTML = templateElement.innerHTML;

    const formulario = document.querySelector('form') as HTMLFormElement;
    const inputTitulo = document.querySelector('#title') as HTMLInputElement;
    const inputDescripcion = document.querySelector('#description') as HTMLTextAreaElement;
    const inputGente = document.querySelector('#people') as HTMLInputElement;
    console.log(inputTitulo);
    console.log(inputDescripcion);
    console.log(inputGente);
    
    formulario.setAttribute('id', 'user-input');
})





