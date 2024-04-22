"use strict";

const form = document.getElementById("configForm");
const pub = document.getElementById("container");
const key = document.getElementById("keyboard");

form.addEventListener("submit", function (event) {
    event.preventDefault();

    if (!(event.target instanceof HTMLFormElement)) {
        throw Error("Unexpected");
    }
    const formData = new FormData(event.target);

    // Récupérer les valeurs des champs du formulaire
    let inputWord = formData.get("word");
    const tentativesMax = Number(formData.get("tentative"));

    inputWord = "*".repeat(targetWord.length);

    initGame(gameEl, inputWord, targetWord.length);
    createGrid(tentativesMax, targetWord.length);
});

/**
 * @param {HTMLElement} gameEl
 * @param {FormDataEntryValue} _tentative
 * @param {any} _mot
 */
function initGame(gameEl, _tentative, _mot) {
    form.style.display = "none";
    gameEl.style.display = "grid";
    key.style.display = "block";
    pub.style.left = "80%";
    openModalBtn.style.right = "92%";
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
    }, 15000); // La publicité réapparaît après 15 secondes
}

// Lancer le cycle d'affichage de la publicité
afficherPublicite();
