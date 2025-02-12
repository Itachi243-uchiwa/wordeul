# Wordeul

**Wordeul** est un jeu de devinettes de mots inspiré du célèbre jeu Wordle. Développé en **HTML**, **CSS**, et **JavaScript**, il propose aux joueurs de deviner un mot mystère en un nombre limité de tentatives.

## Sommaire
- [Description du jeu](#description-du-jeu)
- [Fonctionnalités](#fonctionnalités)
- [Prérequis](#prérequis)
- [Installation](#installation)
- [Utilisation](#utilisation)
- [Structure du projet](#structure-du-projet)
- [Personnalisation](#personnalisation)
- [Licence](#licence)

## Description du jeu

Le but de **Wordeul** est de deviner un mot mystère en un maximum de 5 tentatives. Avant de commencer, le joueur peut choisir la longueur du mot à deviner, adaptant ainsi la difficulté du jeu. Après chaque tentative, le jeu indique :

- **Vert** : la lettre est correcte et bien placée.
- **Jaune** : la lettre est présente dans le mot mais mal placée.
- **Gris** : la lettre n'est pas présente dans le mot.

Le joueur gagne s'il devine le mot avant la fin des 5 tentatives.

## Fonctionnalités

- Choix de la longueur du mot à deviner.
- Interface simple et intuitive.
- Indications visuelles pour chaque tentative.
- Possibilité de relancer une nouvelle partie après la fin.
- Responsive : fonctionne sur desktop et mobile.

## Prérequis

Aucun prérequis technique particulier. Vous avez simplement besoin d'un navigateur web moderne (Chrome, Firefox, Edge, Safari).

## Installation

1. **Cloner le répertoire :**
   ```bash
   git clone https://github.com/votre-utilisateur/wordeul.git
   cd wordeul
   ```

2. **Ouvrir le fichier HTML :**
   Double-cliquez sur `index.html` ou ouvrez-le via votre navigateur préféré.

## Utilisation

1. **Démarrage :**
   - Choisissez la longueur du mot à deviner.
   - Le jeu s’ouvre avec un mot mystère aléatoire de la longueur choisie.
   - Entrez un mot valide de la bonne longueur et appuyez sur **Entrée**.

2. **Rétroaction :**
   - Les couleurs des cases changent pour indiquer la validité des lettres.
   - Continuez jusqu'à deviner le mot ou utiliser toutes les tentatives.

3. **Nouvelle partie :**
   - Cliquez sur **"Nouvelle Partie"** pour recommencer avec une nouvelle longueur de mot si souhaité.

## Structure du projet

```
wordeul/
├── index.html       # Structure de la page
├── style.css        # Styles pour l’interface du jeu
└── script.js        # Logique du jeu (vérification des mots, gestion des entrées)
```

## Personnalisation

- **Changer la liste des mots :**
  - Ouvrez `script.js` et modifiez le tableau contenant les mots mystères.

- **Modifier les couleurs :**
  - Ajustez les styles dans `style.css` pour personnaliser les couleurs des indices.

## Licence

Ce projet est sous licence **MIT**. Vous êtes libre de le modifier et de le redistribuer tant que vous incluez la licence originale.

---

Bon jeu et amusez-vous bien avec **Wordeul** !

