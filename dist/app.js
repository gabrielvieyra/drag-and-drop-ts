"use strict";
document.addEventListener('DOMContentLoaded', () => {
    const templateElement = document.querySelector('#project-input');
    const contenedor = document.querySelector('#app');
    contenedor.innerHTML = templateElement.innerHTML;
    const formulario = document.querySelector('form');
    const inputTitulo = document.querySelector('#title');
    const inputDescripcion = document.querySelector('#description');
    const inputGente = document.querySelector('#people');
    console.log(inputTitulo);
    console.log(inputDescripcion);
    console.log(inputGente);
    formulario.setAttribute('id', 'user-input');
});
