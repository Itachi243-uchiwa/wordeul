'use strict';

const gameEl = document.getElementById("game");
console.log(gameEl);
const targetWord = 'MERCI';
let currentRowIndex = 0;
let currentTileIndex = 0;

function setLetter(numRow, numTile, letter) {
    const row = gameEl.children[numRow];

    // Sélectionner la tuile dans la ligne
    const tile = row.children[numTile];

    // Modifier le contenu de la tuile avec la lettre spécifiée
    tile.textContent = letter;
}

function keyUpHandler(event) {

    const touche = event.key;

    // Vérifie si la touche pressée est une lettre de l'alphabet
    const alphabetLetters = /^[a-zA-Z]$/;
    if (alphabetLetters.test(touche)) {

        const letter = touche.toUpperCase();
        if(currentTileIndex < 5) {
            setLetter(currentRowIndex, currentTileIndex, letter);
            currentTileIndex++;
        }
      else {
            currentRowIndex++;
             currentTileIndex = 0;
            setLetter(currentRowIndex, currentTileIndex, letter);
            currentTileIndex++;
        }
    }
    else if (touche === 'Backspace') {
        if (currentTileIndex > 0) {
            currentTileIndex.textContent = 'X';
            currentTileIndex--;
        }
        else if (currentRowIndex > 0) {
            currentRowIndex--;
            currentTileIndex = gameEl.children[currentRowIndex].children.length-1;
        }
        gameEl.children[currentRowIndex].children[currentTileIndex].textContent = 'X';
        e.preventDefault();
    }
    else if (touche === 'Enter') {
        const currentWord = getCurrentWord();
        wellplaced(currentWord);
        badplaced(currentWord);
        currentRowIndex++;
        currentTileIndex--;
    }
}
function getCurrentWord() {
    let word = '' ;
    for (let i = 0; i < gameEl.children.length, i++;) {
        word +=gameEl.children[currentRowIndex].children[i].textContent;
    }
    return word;
} 

function wellplaced(word) {
    for (let i = 0; i < word.length ; i++) {
        if (targetWord[i] === word[i]) {
            gameEl.children[currentRowIndex].children[i].classList.add('correct');
        }
    }
}
function badplaced(word) {
    let tab = new Array(5).fill(fasle);
    for (let i = 0; i < 5; i++) {
        if (targetWord[i] === word[i]) {
            tab[i] = true;
            gameEl.children[currentRowIndex].children[i].classList.add('correct');
        }
    }
    for (let j=0; j < 5; j++) {
        if (targetWord[i] != word[i]) {
            for (let k = 0; k < 5; k++) {
                if (!tab[j] && targetWord[k] === word[j]) {
                    tab[k] = true;
                    gameEl.children[currentRowIndex].children[k].classList.add('present');
                }
            }
        }
        else {
            gameEl.children[currentRowIndex].children[k].classList.add('absent');
        }
    }
}


document.addEventListener('keyup', keyUpHandler);

