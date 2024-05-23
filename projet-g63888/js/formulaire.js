"use strict";

const form = document.getElementById("configForm");
const pub = document.getElementById('container');
const key = document.getElementById("keyboard");

form.addEventListener('submit', function (event) {
    event.preventDefault();

    if (!(event.target instanceof HTMLFormElement)) {
        throw Error("Unexpected");
    }
    const formData = new FormData(event.target);

    // Récupérer les valeurs des champs du formulaire
    let inputWord = formData.get('word');
    const numAttempts = formData.get('tentative');


    initGame(gameEl, numAttempts, targetWord.length);
    createGrid(gameEl, tentativesMax, targetWord.length);
});

function initGame(game, tentative, mot) {
    form.style.display = 'none';
    game.style.display = 'grid';
    key.style.display = 'block';
    pub.style.left = '80%';
    openModalBtn.style.right = '92%'
}

document.addEventListener('DOMContentLoaded', function () {
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

// Fonction pour afficher la publicité
function afficherPublicite() {
    pub.style.transition = "opacity 4s"; // Définit la transition de 1 seconde
    pub.style.opacity = "1";
    // pub.style.display = 'grid';
    console.log("La publicité s'affiche");
    // Définir un délai pour la disparition de la publicité
    setTimeout(() => {
        cacherPublicite();
    }, 30000); // La publicité reste affichée pendant 20 secondes
}

// Fonction pour cacher la publicité
function cacherPublicite() {
    pub.style.transition = "opacity 4s"; // Définit la transition de 1 seconde
    pub.style.opacity = "0";
    // pub.style.display = 'none';
    console.log("La publicité disparaît");
    // Définir un délai pour l'affichage de la publicité suivante
    setTimeout(() => {
        afficherPublicite();
    }, 20000); // La publicité réapparaît après 5 secondes
}

// Lancer le cycle d'affichage de la publicité
afficherPublicite();

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




