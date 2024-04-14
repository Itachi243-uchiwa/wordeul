// Fonction pour charger un fichier texte
function loadDictionaryFromFile(filePath, callback) {
    fetch(filePath)
        .then(response => response.text())
        .then(text => {
            // Divise le texte en lignes et supprime les espaces vides
            const words = text.split('\n').map(word => word.trim());
            callback(null, words);
        })
        .catch(error => {
            callback(error, null);
        });
}

// Utilisation de la fonction pour charger le fichier texte
const filePath = 'dictionary.txt'; // Chemin vers votre fichier texte
loadDictionaryFromFile(filePath, (error, dictionary) => {
    if (error) {
        console.error('Erreur lors du chargement du dictionnaire:', error);
    } else {
        console.log('Dictionnaire chargé avec succès:', dictionary);
        // Utilisez le dictionnaire chargé comme nécessaire dans votre application
    }
});
