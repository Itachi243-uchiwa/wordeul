<<<<<<< HEAD
 let dict;
 var targetWord;

=======

// function loadDictionaryFromFile(filePath, callback) {
//     fetch(filePath)
//         .then(response => response.text())
//         .then(text => {
//             const words = text.split('\n').map(word => word.trim());
//             callback(null, words);
//         })
//         .catch(error => {
//             callback(error, null);
//         });
// }

// const filePath = 'dico.txt'; 
// loadDictionaryFromFile(filePath, (error, dictionary) => {
//     if (error) {
//         console.error('Erreur lors du chargement du dictionnaire:', error);
//     } else {
//         console.log('Dictionnaire chargé avec succès:', dictionary);
       
//     }
// });


 // eslint-disable-next-line
 let dict;
 var targetWord;

>>>>>>> b68a18fe6b9d22d772e9ca925f6076e4ea4e895f
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
 
 _getDict(6).then((result) => {
    dict = result;
    if (!dict) {
        throw Error("Dictionnaire non chargé.");
        }
    else {
        console.log('Dictionnaire chargé avec succès:');
    }  
 })

 /**
 * Renvoie un mot au hasard à partir d'un dictionnaire.
 * @param {string[]} dico - Le dictionnaire contenant une liste de mots.
 * @returns {string} Un mot choisi au hasard dans le dictionnaire.
 */
function hasard(dico) {
    if (dico.length === 0) {
        throw new Error('Le dictionnaire est vide.');
    }
    const indexAleatoire = Math.floor(Math.random() * dico.length);
    return dico[indexAleatoire];
}
const boutton = document.getElementById("btn1")
boutton.addEventListener('click', function(e) {
    e.preventDefault();
    targetWord = hasard(dict);
<<<<<<< HEAD
    document.getElementById("word").value = targetWord;
=======
    taille = targetWord.length;
>>>>>>> b68a18fe6b9d22d772e9ca925f6076e4ea4e895f
    console.log(targetWord);
})
;

