const alphabet = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
    'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
];
let motRechercher = [];
let motCacher = [];
let lettreUtiliser = [];
let nbTentativeRestante = 10;

// Initialisation du jeu
reset();

// 0. Réinitialiser le jeu
function reset() {
    creer_lettres_alphabet();
    creer_mot_a_rechercher();
}

// 1. Créer le tableau de lettres de l'alphabet
function creer_lettres_alphabet() {
    const container = document.getElementById('button-container');

    for (let i = 0; i < alphabet.length; i++) {
        let letter = alphabet[i];
        const button = document.createElement('button');
        button.textContent = letter;
        button.addEventListener('click', function () {
            rechercher_une_lettre(letter);
        });
        container.appendChild(button);
    }
}


// Creation du mot à rechercher en remplacant ses lettres par des "_"
function creer_mot_a_rechercher() {
    let idMot = Math.floor(Math.random() * dico.length);
    let mot = dico[idMot]

    let motMasquer = "";
    const container = document.getElementById('motRechercher-container');

    for (let i = 0; i < mot.length; i++) {
        motRechercher.push(mot[i]);
        if (/[a-zA-Z]/.test(mot[i])) {
            motMasquer = motMasquer + "_ ";
            motCacher.push("_")
        } else {
            motMasquer = motMasquer + mot[i] + " ";
            motCacher.push(mot[i])
        }
    }

    container.textContent = motMasquer;
    /*
        // #DEV-ONLY
        console.log("--LOG idMot : " + idMot);
        console.log("--LOG mot : " + mot);
        console.log("--LOG motRechercher : " + motRechercher);
        console.log("--LOG motMasquer : " + motMasquer);
        // #DEV-ONLY
        */
}



// Recherche de la lettre cliqué dans le mot à rechercher
function rechercher_une_lettre(letter) {

    console.log('--LOG letter : ' + letter);
    letter = letter.toUpperCase();
    if (motRechercher.includes(letter)) {
        console.log("--LOG motRechercher.includes(letter) => OK");
        reveler_une_lettre(letter);
    } else {
        console.log("--LOG motRechercher.includes(letter) => KO");
        nbTentativeRestante--;
    }
    majAffichage()
}


// Si la lettre est présente dans le mot recherché elle est affichée
function reveler_une_lettre(letter) {

    console.log("--LOG reveler_une_lettre(letter) letter = " + letter);

    // Parcourir le tableau pour trouver les positions de la lettre
    for (let i = 0; i < motRechercher.length; i++) {
        if (motRechercher[i] === letter) {
            console.log("--LOG Position : " + i);
            console.log("--LOG motCacher[i] avant : " + motCacher[i]);
            motCacher[i] = letter;

            console.log("--LOG motCacher[i] apres : " + motCacher[i]);
        }
    }

    majAffichage()
}


function majAffichage() {
    const containerMotRechercher = document.getElementById('motRechercher-container');
    const containerErreur = document.getElementById('erreur-container');

    let motAfficher = "";
    for (let i = 0; i < motCacher.length; i++) {
        motAfficher = motAfficher + " " + motCacher[i];
    }
    containerMotRechercher.textContent = motAfficher;

    containerErreur.textContent = "Il te reste " + nbTentativeRestante;
}



function verif_victoire() { } // Vérifier si le jeu est gagné
function reveler_mot() { } // Afficher le mot rechercher