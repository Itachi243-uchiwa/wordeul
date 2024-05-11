// @ts-nocheck
"use strict";

const form = document.getElementById("configForm");
const pub = document.getElementById("container");
const key = document.getElementById("keyboard");
const h1 = document.querySelector("h1");

form.addEventListener("submit", function (event) {
    event.preventDefault();

    if (!(event.target instanceof HTMLFormElement)) {
        throw Error("Unexpected");
    }
    const formData = new FormData(event.target);
    tentativesMax = formData.get("tentative");
    const inputWord = formData.get("word").toString();

    initGame(tentativesMax, inputWord.length);
});

/**
 * @param {HTMLElement} game
 * @param {FormDataEntryValue} tentative
 * @param {any} mot
 */
function initGame(tentative, wordLength) {
    createGrid(tentative, wordLength);
    h1.style.color = "Yellow";
    form.style.display = "none";
    gameEl.style.display = "grid";
    key.style.display = "block";
    gameEl.classList.add("fadeIn");
    setTimeout(() => {
        gameEl.classList.remove("fadeIn");
    }, 2000);
    pub.style.left = "80%";
    openModalBtn.style.right = "92%";
}

/**
 * reçoit 2 parametres numeros lignes et colonnes et l'element html pour créer la grille du jeu
 * @param {number} numRows
 * @param {number} wordLength
 */
function createGrid(numRows, wordLength) {
    gameEl.style.gridTemplateRows = `repeat(${numRows}, 1fr)`;

    for (let i = 0; i < numRows; i++) {
        const row = document.createElement("div");
        row.classList.add("row");

        for (let j = 0; j < wordLength; j++) {
            const tile = document.createElement("div");
            tile.classList.add("tile");
            tile.textContent = "X";

            row.appendChild(tile);
            row.style.gridTemplateColumns = `repeat(${wordLength}, 1fr)`;
        }
        gameEl.appendChild(row);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const slides = document.querySelectorAll(".slide");

    let currentSlide = 0;
    const interval = 2000;

    function startSlideshow() {
        setInterval(() => {
            // Masquer la diapositive actuelle
            slides[currentSlide].classList.remove("active");
            // Passez à la diapositive suivante
            currentSlide = (currentSlide + 1) % slides.length;
            // Afficher la nouvelle diapositive
            slides[currentSlide].classList.add("active");
        }, interval);
    }

    startSlideshow();
});

// Fonction pour afficher la publicité
function afficherPublicite() {
    pub.style.transition = "opacity 4s";
    pub.style.opacity = "1";

    console.log("La publicité s'affiche");

    setTimeout(() => {
        cacherPublicite();
    }, 30000); // La publicité reste affichée pendant 30 secondes
}

// Fonction pour cacher la publicité
function cacherPublicite() {
    pub.style.transition = "opacity 4s"; // Définit la transition de 1 seconde
    pub.style.opacity = "0";

    console.log("La publicité disparaît");
    setTimeout(() => {
        afficherPublicite();
    }, 15000); // La publicité réapparaît après 5 secondes
}

// Lancer le cycle d'affichage de la publicité
afficherPublicite();

// boutton pour recommencer le jeu
const boutonsRestart = document.querySelectorAll("#restart");

boutonsRestart.forEach((boutonRestart) => {
    boutonRestart.addEventListener("click", function(e) {
        e.preventDefault();
        boutton.click();
        form.submit();
    });
});
