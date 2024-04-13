var dict;
var targetWord;

/**
 * @param {number} length entre 6 et 10
 * @param {string} firstLetter entre A et Z
 * 
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
        .catch((error) => console.error("Erreur pour récupérer le dictionnaire."));
}

_getDict(6).then((result) => {
    dict = result;
});

// fonction pour choisir un mot au hasard et le mettre dans le champ de texte du formulaire
function chooseRandomWord() {
    if (!dict) {
        throw Error("Dictionnaire non chargé.");
    }
    // Choisissez un mot au hasard dans le dictionnaire (dict)
    const randomIndex = Math.floor(Math.random() * dict.length);
    targetWord = dict[randomIndex];
}

// Sélectionnez le bouton
const randomWordButton = document.getElementById("btn1");

// Ajoutez un gestionnaire d'événements au clic du bouton pour appeler la fonction chooseRandomWord()
randomWordButton.addEventListener("click", function(e) {
    e.preventDefault();
    chooseRandomWord();
});


