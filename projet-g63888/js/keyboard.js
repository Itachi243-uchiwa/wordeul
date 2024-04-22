"use strict";

// Sélectionnez le conteneur du clavier
const keyboardContainer = document.getElementById("clavier");

// Liste des touches du clavier
const keyboardKeys = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["Enter", "Z", "X", "C", "V", "B", "N", "M"],
];

// Ajoutez chaque ligne de touches au conteneur du clavier
keyboardKeys.forEach((row) => {
    const rowElement = document.createElement("div");
    rowElement.classList.add("keyboard");
    row.forEach((key) => {
        const buttonElement = document.createElement("button");
        buttonElement.classList.add("letter");
        if (key === "A") {
            buttonElement.classList.add("btn");
        }
        if (key === "Enter") {
            buttonElement.classList.add("enter");
        }

        buttonElement.textContent = key;
        rowElement.appendChild(buttonElement);
    });
    keyboardContainer.appendChild(rowElement);
});

// Ajoutez le bouton "BACKSPACE"
const backButton = document.createElement("button");
backButton.classList.add("back");
backButton.innerHTML = "\u232b";
keyboardContainer.appendChild(backButton);

// Sélectionnez tous les boutons du clavier
const buttons = document.querySelectorAll("#clavier button");
// Ajoutez un gestionnaire d'événements "click" à chaque bouton
buttons.forEach((button) => {
    button.addEventListener("click", () => {
        const buttonText = button.textContent;
        console.log(button);

        if (buttonText === "Enter") {
            tentativesActuel++;
            handleEnterKeyPress();
        } else if (buttonText === "\u232b") { // Correction ici
            handleBackspace();
        } else if (/[a-zA-Z]/.test(buttonText)) {
            handleLetterInput(buttonText.toUpperCase());
        }
    });
});
