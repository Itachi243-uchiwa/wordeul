"use strict";

// Initialisation des variables globales
const gameEl = getGameElement();
let currentRowIndex = 0;
let currentTileIndex = 0;
let tentativesActuel = 0;
const sonVictory = new Audio("applaudissement.wav");
const sonWorddown = new Audio("buzzer.mp3");
const sonDefeat = new Audio("downer_noise.mp3");

// Ajout du gestionnaire d'événements keyup
// rnvs : l'association ci-dessous a lieu dès le chargement de la page => erreur dans keyUpHandler lorsqu'on fournit le mot à deviner !
document.addEventListener("keyup", keyUpHandler);

/**
 * Récupère l'élément DOM du jeu.
 * @returns {HTMLElement} L'élément DOM représentant le jeu.
 */
function getGameElement() {
    return document.getElementById("game");
}

/**
 * Modifie la lettre à la position spécifiée dans la grille de jeu.
 * @param {number} numRow - Le numéro de la ligne.
 * @param {number} numTile - Le numéro de la tuile.
 * @param {string} letter - La lettre à placer dans la tuile.
 */
function setLetter(numRow, numTile, letter) {
    const row = gameEl.children[numRow];
    const tile = row.children[numTile];
    tile.textContent = letter;
}

/**
 * Gère l'événement keyup pour le jeu.
 * @param {KeyboardEvent} event - L'événement keyup.
 */
function keyUpHandler(event) {
    const touche = event.key;
    const alphabetLetters = /^[a-zA-Z]$/;

    if (alphabetLetters.test(touche)) {
        handleLetterInput(touche.toUpperCase());
    } else if (touche === "Backspace") {
        handleBackspace();
    } else if (touche === "Enter") {
        // rnvs : pas de vérification si ligne complète
        tentativesActuel++;
        handleEnterKeyPress();
    }
}

/**
 * Traite l'entrée d'une lettre dans la grille.
 * @param {string} letter - La lettre saisie.
 */
function handleLetterInput(letter) {
    if (currentTileIndex < targetWord.length) {
        setLetter(currentRowIndex, currentTileIndex, letter);
        currentTileIndex++;
    } else {
        currentRowIndex++;
        currentTileIndex = 0;
        setLetter(currentRowIndex, currentTileIndex, letter);
        currentTileIndex++;
    }
}

/**
 * Traite l'appui sur la touche Backspace.
 */
function handleBackspace() {
    if (currentTileIndex > 0) {
        currentTileIndex--;
        setLetter(currentRowIndex, currentTileIndex, "X");
    } else if (currentRowIndex > 0) {
        currentRowIndex--;
        currentTileIndex = gameEl.children[currentRowIndex].children.length - 1;
        setLetter(currentRowIndex, currentTileIndex, "X");
    }
}

/**
 * Traite l'appui sur la touche Enter.
 */
function handleEnterKeyPress() {
    const currentWord = getCurrentWord();
// rnvs : ici on findWord_dict(), mais pas quand on fournit le mot à trouver => incohérence et possibilité d'avoir des jeux impossibles à trouver
    if (findWord_dict(currentWord, dict)) {
        well_or_bad_placed(currentWord);

        // La classe d'animation
        const row = gameEl.children[currentRowIndex];
        for (let i = 0; i < targetWord.length; i++) {
            row.children[i].classList.add("rotate");
            setTimeout(() => {
                row.children[i].classList.remove("rotate");
            }, 1000);
        }
        if (jeuTerminer(currentWord)) {
            document.removeEventListener("keyup", keyUpHandler);
            return;
        }

        currentRowIndex++;
        currentTileIndex = 0;
    } else {
        tentativesActuel--;
        sonWorddown.play();
        gameEl.classList.add("shake-animation");
        setTimeout(() => {
            gameEl.classList.remove("shake-animation");
        }, 1000);

        for (let i = 0; i < targetWord.length; i++) {
            gameEl.children[currentRowIndex].children[i].textContent = "X";
            currentTileIndex = 0;
        }
    }
}

/**
 * Fonction qui verifie si on gagné ou perdu ou les tentatives <5
 * @param {string} word - le mot actuellement saisi
 * @returns {boolean} true si le jeu est terminé, sinon false
 */
function jeuTerminer(word) {
    if (word === targetWord) {
        gameEl.children[currentRowIndex].classList.add("pulse-animation");
        sonVictory.play();
        victoryModal();
        return true;
    } else if (tentativesActuel >= tentativesMax) {
        sonDefeat.play();
        defeatModal();
        return true;
    }

    return false;
}

/**
 * Récupère le mot actuellement saisi dans la grille de jeu.
 * @returns {string} Le mot actuellement saisi.
 */
function getCurrentWord() {
    let word = "";
    for (let i = 0; i < targetWord.length; i++) {
        word += gameEl.children[currentRowIndex].children[i].textContent;
    }

    return word;
}

/**
 * Marque les lettres mal placées dans la grille.
 * @param {string} word - Le mot actuellement saisi.
 */
function well_or_bad_placed(word) {
    const tab = new Array(targetWord.length).fill(false);
    for (let i = 0; i < targetWord.length; i++) {
        if (targetWord[i] === word[i]) {
            tab[i] = true;
            gameEl.children[currentRowIndex].children[i].classList.add("correct");
            findButtonByLetter(word[i]).classList.add("correct");
        }
    }

    for (let j = 0; j < targetWord.length; j++) {
        if (targetWord[j] !== word[j]) {
            let letterFound = false;
            for (let k = 0; k < targetWord.length; k++) {
                if (!tab[k] && targetWord[k] === word[j]) {
                    tab[k] = true;
                    letterFound = true;
                    gameEl.children[currentRowIndex].children[j].classList.add("present");
                    findButtonByLetter(word[j]).classList.add("present");
                    break;
                }
            }

            if (!letterFound) {
                gameEl.children[currentRowIndex].children[j].classList.add("absent");
                findButtonByLetter(word[j]).classList.add("absent");
            }
        }
    }
}

// Récupérer les éléments modales
const victoire = document.getElementById("winModal");
const defaite = document.getElementById("failModal");

// Récupérer le bouton de fermeture de chaque modale
const boutonWin = victoire.querySelector(".close");
const boutonFail = defaite.querySelector(".close");

/**
 * Affiche la modale de victoire.
 */
function victoryModal() {
    const winMsg = document.getElementById("winMsg");
    winMsg.innerHTML = "Félicitations, vous avez gagné!<br><br>Tentatives : ${tentativesActuel}/${tentativesMax}";
    victoire.style.display = "block";
}

/**
 * Affiche la modale de défaite.
 */
function defeatModal() {
    const failMsg = document.getElementById("failMsg");
    const coloredWord = `<span class="word">${targetWord}</span>`;
    failMsg.innerHTML = `Dommage, Vous avez perdu! <br>Tentatives : ${tentativesMax}/${tentativesMax}
                        <br><br>Le Mot était  ${coloredWord}`;
    defaite.style.display = "block";
}

// Événements de fermeture des modales lorsqu'on clique sur le bouton de fermeture
boutonWin.addEventListener("click", () => {
    victoire.style.display = "none";
});
boutonFail.addEventListener("click", () => {
    defaite.style.display = "none";
});

/**
 * @param {string} mot
 */
function findButtonByLetter(mot) {
    let bouttonColored = null;

    // Parcourez chaque bouton du clavier virtuel avec forEach
    buttons.forEach((button) => {
        // Comparez la lettre du bouton avec la lettre donnée
        if (button.textContent === mot) {
            bouttonColored = button;
        }
    });

    return bouttonColored;
}

/**
 * @param {string} word
 * @param {string | any[]} dictionary
 */
function findWord_dict(word, dictionary) {
    return dictionary.includes(word);
}
