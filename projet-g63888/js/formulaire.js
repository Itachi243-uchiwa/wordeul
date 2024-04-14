"use strict";

const form = document.getElementById("configForm");
const pub = document.getElementsByClassName('container');
const key = document.getElementById("keyboard");

document.getElementById("word").value = '*'.repeat(taille);

form.addEventListener('submit', function(event) {
    event.preventDefault();

    if (!(event.target instanceof HTMLFormElement)) {
        throw Error("Unexpected");
    } 
    const formData = new FormData(event.target);

    // Récupérer les valeurs des champs du formulaire
    let inputWord = formData.get('word');
    const numAttempts = formData.get('tentative');

    inputWord = '*'.repeat(taille);

    initGame(gameEl, numAttempts, taille);
});

function initGame(game, tentative, mot) {
    form.style.display = 'none';
    game.style.display = 'grid';
    key.style.display = 'block';
    pub[0].style.left = '80%'; // Ajustez la valeur selon vos besoins
    openModalBtn.style.right ='92%'
}

document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.slide');

    let currentSlide = 0;
    const interval = 2000;

    function startSlideshow() {
        setInterval(() => {
            // Masquer la diapositive actuelle
            slides[currentSlide].classList.remove('active');
            // Passez à la diapositive suivante
            currentSlide = (currentSlide + 1) % slides.length;
            // Afficher la nouvelle diapositive
            slides[currentSlide].classList.add('active');
        }, interval);
    }

    startSlideshow();
});
// Sélectionnez le bouton
const randomWordButton = document.getElementById("btn1");



