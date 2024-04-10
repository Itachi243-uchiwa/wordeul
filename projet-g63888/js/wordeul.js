'use strict';

const gameEl = document.getElementById("game");
console.log(gameEl);

function setLetter(numRow, numTile, letter) {
    const row = gameEl.children[numRow - 1]; 
    
    // Sélectionner la tuile dans la ligne
    const tile = row.children[numTile-1];
    
    // Modifier le contenu de la tuile avec la lettre spécifiée
    tile.textContent = letter;
}

function keyUpHandler(event) {
    
    const touche = event.key;
    
    // Vérifie si la touche pressée est une lettre de l'alphabet
    const alphabetLetters = /^[a-zA-Z]$/;
    if (!alphabetLetters.test(touche)) {
        
        return;
    }
    
    setLetter(1, 1, touche.toUpperCase()); // Convertir en majuscule
}

document.addEventListener('keyup', keyUpHandler);

