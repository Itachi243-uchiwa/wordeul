'use strict';

// Initialisation des variables globales
const gameEl = getGameElement();
let currentRowIndex = 0;
let currentTileIndex = 0;
let tentativesActuel = 0;
const tentativesMax = 6;

// Ajout du gestionnaire d'événements keyup
document.addEventListener('keyup', keyUpHandler);

/**
 * Récupère l'élément DOM du jeu.
 * @returns {HTMLElement} L'élément DOM représentant le jeu.
 */
function getGameElement() {
	return document.getElementById('game');
}

/**
 * Modifie la lettre à la position spécifiée dans la grille de jeu.
 * @param {HTMLElement} gameEl - L'élément DOM représentant le jeu.
 * @param {number} numRow - Le numéro de la ligne.
 * @param {number} numTile - Le numéro de la tuile.
 * @param {string} letter - La lettre à placer dans la tuile.
 */
function setLetter(gameEl, numRow, numTile, letter) {
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
		handleLetterInput(gameEl, touche.toUpperCase());
	} else if (touche === 'Backspace') {
		handleBackspace(gameEl);
	} else if (touche === 'Enter') {
		tentativesActuel++;
		handleEnterKeyPress(gameEl);
	}
}

/**
 * Traite l'entrée d'une lettre dans la grille.
 * @param {HTMLElement} gameEl - L'élément DOM représentant le jeu.
 * @param {string} letter - La lettre saisie.
 */
function handleLetterInput(gameEl, letter) {
	if (currentTileIndex < targetWord.length) {
		setLetter(gameEl, currentRowIndex, currentTileIndex, letter);
		currentTileIndex++;
	} else {
		currentRowIndex++;
		currentTileIndex = 0;
		setLetter(gameEl, currentRowIndex, currentTileIndex, letter);
		currentTileIndex++;
	}
}

/**
 * Traite l'appui sur la touche Backspace.
 * @param {HTMLElement} gameEl - L'élément DOM représentant le jeu.
 */
function handleBackspace(gameEl) {
	if (currentTileIndex > 0) {
		currentTileIndex--;
		setLetter(gameEl, currentRowIndex, currentTileIndex, 'X');
	} else if (currentRowIndex > 0) {
		currentRowIndex--;
		currentTileIndex = gameEl.children[currentRowIndex].children.length - 1;
		setLetter(gameEl, currentRowIndex, currentTileIndex, 'X');
	}
}

/**
 * Traite l'appui sur la touche Enter.
 * @param {HTMLElement} gameEl - L'élément DOM représentant le jeu.
 */

function handleEnterKeyPress(gameEl) {
	const currentWord = getCurrentWord(gameEl);

	if (findWord_dict(currentWord, dict)){
	wellplaced(gameEl, currentWord);
	badplaced(gameEl, currentWord);

	// La classe d'animation
	const row = gameEl.children[currentRowIndex];
	row.classList.add('pulse-animation');

	// Supprime la classe d'animation après un délai pour permettre la répétition
	setTimeout(() => {
		row.classList.remove('pulse-animation');
	}, 500); // La durée de l'animation en milliseconde
	if (jeuTerminer(currentWord)) {
		return;
	}

	currentRowIndex++;
	currentTileIndex = 0;	
}
   else {
		tentativesActuel--;
		gameEl.classList.add('shake-animation');
		setTimeout(() => {
			gameEl.classList.remove('shake-animation');
		}, 500);

		for (let i = 0; i < targetWord.length; i++) {
			gameEl.children[currentRowIndex].children[i].textContent = 'X';
			currentTileIndex = 0; }
   }

}

/**
 * Fonction qui verifie si on gagné ou perdu ou les tentatives <5
 * @param {string} word - le mot actuellement saisi
 * @returns {boolean} true si le jeu est terminé, sinon false
 */
function jeuTerminer(word) {
	if (word === targetWord) {
		victoryModal();
		return true;
	}

	if (tentativesActuel === tentativesMax) {
		defeatModal();
		return true;
	}

	return false; 

}

/**
 * Récupère le mot actuellement saisi dans la grille de jeu.
 * @param {HTMLElement} gameEl - L'élément DOM représentant le jeu.
 * @returns {string} Le mot actuellement saisi.
 */
function getCurrentWord(gameEl) {
	let word = '';
	for (let i = 0; i < targetWord.length; i++) {
		word += gameEl.children[currentRowIndex].children[i].textContent;
	}

	return word;
}

/**
 * Marque les lettres correctement placées dans la grille.
 * @param {HTMLElement} gameEl - L'élément DOM représentant le jeu.
 * @param {string} word - Le mot actuellement saisi.
 */
// Sélectionnez tous les boutons du clavier
function wellplaced(gameEl, word) {
	for (let i = 0; i < targetWord.length; i++) {
		if (targetWord[i] === word[i]) {
			gameEl.children[currentRowIndex].children[i].classList.add('correct');
			findButtonByLetter(word[i]).classList.add('correct');
		}
	}
}

/**
 * Marque les lettres mal placées dans la grille.
 * @param {HTMLElement} gameEl - L'élément DOM représentant le jeu.
 * @param {string} word - Le mot actuellement saisi.
 */
function badplaced(gameEl, word) {
	const tab = new Array(targetWord.length).fill(false);
	for (let i = 0; i < targetWord.length; i++) {
		if (targetWord[i] === word[i]) {
			tab[i] = true;
			// GameEl.children[currentRowIndex].children[i].classList.add('correct');
		}
	}

	for (let j = 0; j < targetWord.length; j++) {
		if (targetWord[j] !== word[j]) {
			let letterFound = false;
			for (let k = 0; k < targetWord.length; k++) {
				if (!tab[k] && targetWord[k] === word[j]) {
					tab[k] = true;
					letterFound = true;
					gameEl.children[currentRowIndex].children[j].classList.add('present');
					findButtonByLetter(word[j]).classList.add('present')
					// GameEl.children[currentRowIndex].children[k].classList.add('present');
					break;
				}
			}

			if (!letterFound) {
				gameEl.children[currentRowIndex].children[j].classList.add('absent');
				findButtonByLetter(word[j]).classList.add('absent')
			}
		}
	}
}

// Récupérer les éléments modales
const victoire = document.getElementById('winModal');
const defaite = document.getElementById('failModal');

// Récupérer le bouton de fermeture de chaque modale
const boutonWin = victoire.querySelector('.close');
const boutonFail = defaite.querySelector('.close');

/**
 * Affiche la modale de victoire.
 */
function victoryModal() {
	const winMsg = document.getElementById('winMsg');
	winMsg.innerHTML = `Félicitations, vous avez gagné!<br><br>Tentatives : ${tentativesActuel}/${tentativesMax}`;
	victoire.style.display = 'block';
}

/**
 * Affiche la modale de défaite.
 */
function defeatModal() {
	const failMsg = document.getElementById('failMsg');
	const coloredWord = `<span class="word">${targetWord}</span>`;
	failMsg.innerHTML = `Dommage, Vous avez perdu! <br>Tentatives : 5/5 <br>Le Mot était  ${coloredWord}`;
	defaite.style.display = 'block';
}

// Événements de fermeture des modales lorsqu'on clique sur le bouton de fermeture
boutonWin.addEventListener('click', () => {
	victoire.style.display = 'none';
});
boutonFail.addEventListener('click', () => {
	defaite.style.display = 'none';
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

function findButtonByLetter(mot) {
	let bouttonColored = null;

	// Parcourez chaque bouton du clavier virtuel avec forEach
	buttons.forEach(button => {
		// Comparez la lettre du bouton avec la lettre donnée
		if (button.textContent === mot) {
			bouttonColored = button;
		}
	});

	return bouttonColored;
}

function findWord_dict(word, dictionary){
    return dictionary.includes(word); }


