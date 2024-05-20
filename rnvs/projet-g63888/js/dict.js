"use strict";
/*eslint init-declarations: ["error", "never"]*/

let dict;
let targetWord;
let tentativesMax;

/**
  * @param {number} length entre 6 et 10
  * @param {string} firstLetter entre A et Z
  */
async function _getDict(length, firstLetter = null) {
    const project = "https://git.esi-bru.be/api/v4/projects/51440";
    const file = firstLetter ? `${length}.${firstLetter}` : `${length}`;
    return fetch(`${project}/repository/files/${file}/raw`)
        .then((r) => {
            if (!r.ok) {
                throw Error(`Code d'erreur du serveur ${r.status}`);
            }
            return r.text();
        })
        .then((r) => r.split("\n"))
        .catch((error) => console.error("Erreur pour rÃ©cupÃ©rer le dictionnaire."));
}

// rnvs : un seul dictionnaire chargé
const length_mot = Math.floor(Math.random() * (10 - 6 + 1)) + 6;
console.log(length_mot);
_getDict(length_mot).then((result) => {
    dict = result;
    if (!dict) {
        throw Error("Dictionnaire non chargé.");
    } else {
        console.log("Dictionnaire chargé avec succès:");
    }
});

/**
 * Renvoie un mot au hasard à partir d'un dictionnaire.
 * @param {string[]} dico - Le dictionnaire contenant une liste de mots.
 * @returns {string} Un mot choisi au hasard dans le dictionnaire.
 */
function hasard(dico) {
    if (dico.length === 0) {
        throw new Error("Le dictionnaire est vide.");
    }
    const indexAleatoire = Math.floor(Math.random() * dico.length);
    return dico[indexAleatoire];
}
const boutton = document.getElementById("btn1");
boutton.addEventListener("click", function (e) {
    e.preventDefault();
    targetWord = hasard(dict);
    // @ts-ignore
    document.getElementById("word").value = targetWord;
    console.log(targetWord);
})
    ;
