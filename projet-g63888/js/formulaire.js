"use strict";

const form = document.getElementById("configForm");
const pub = document.getElementsByClassName('container');
const key = document.getElementById("keyboard");

document.getElementById("word").value = targetWord;

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
    createGrid(gameEl, tentativesMax, taille);

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
function createGrid(gameEl, numRows, wordLength) {
    // Définir les styles CSS dynamiquement
    gameEl.style.gridTemplateRows = `repeat(${numRows}, 1fr)`;

    for (let i = 0; i < numRows; i++) {
        const row = document.createElement('div');
        row.classList.add('row');

        for (let j = 0; j < wordLength; j++) {
            const tile = document.createElement('div');
            tile.classList.add('tile');
            tile.textContent = "X";

            row.appendChild(tile);
			row.style.gridTemplateColumns = `repeat(${wordLength}, 1fr)`;
        }
        gameEl.appendChild(row);
    }
}



