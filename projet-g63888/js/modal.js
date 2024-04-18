// Sélectionnez le bouton et la modal
const openModalBtn = document.getElementById('open');
const modal = document.getElementById('myModal');

// Sélectionnez le bouton de fermeture
const closeModalBtn = document.getElementById("fermer");

// Ajoutez un gestionnaire d'événements pour le clic sur le bouton
openModalBtn.addEventListener('click', function () {
    modal.style.display = 'block'; // Affiche la modal lorsque le bouton est cliqué
});

// Ajoutez un gestionnaire d'événements pour le clic sur le bouton de fermeture
closeModalBtn.addEventListener('click', function () {
    modal.style.animationName = 'modalFadeOut';
    setTimeout(() => {
        modal.style.display = 'none';
    }, 1000);

});

const boutonRestart = document.getElementById('restart');
boutonRestart.addEventListener('click', function() {
    location.reload();
})