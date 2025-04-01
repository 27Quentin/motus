const motCible = listeMots[Math.floor(Math.random() * listeMots.length)]; // choisir aléatoirement un mot depuis dbmot
const essaisMax = 6; // on définit la constante pour bloquer le nombre d'essais
let essais = 0; // variable du nombre d'essais déjà utilisé

const tab = document.getElementById('tab'); // constante pour récuperer les élémetn du fichier html

function creertab() { //fonction pour creer le tableau
    for (let i = 0; i < essaisMax * 5; i++) {  // on loop pour creer 30 cellules sur le tableau
        const cellule = document.createElement('div'); // création d'une div
        cellule.className = 'cellule';  // ajout de la classe 'cellule'
        tab.appendChild(cellule); // on ajoute la cellule au tab
    }
}

// fonction qu'on appele lorsqu'une proposition est envoyé coté client
function soumettreProposition() { 
    const champProposition = document.getElementById('proposition'); // recup de l'entrée client
    const proposition = champProposition.value.toUpperCase(); // conversion de l'entrée en majuscules

    if (proposition.length !== 5) {     // validation du mot qui doit comporter 5 lettres
        alert("Le mot doit comporter 5 lettres. Sérieux tu vois pas les cases ?");
        return;
    }

    if (essais >= essaisMax) {     // vérif si le nombre maximum d essai est atteint
        alert("Nan mais arrête de jouer en fait. C'est finit si jamais.");
        return;
    }

    const indexDepart = essais * 5;     // calcul de l'index de départ pour les cellules actuelles

        // check des lettres de la proposition de l'utilisateur
    for (let i = 0; i < 5; i++) {
        const cellule = tab.children[indexDepart + i]; // selection de la cellule
        cellule.textContent = proposition[i]; // on affiche la lettre dans la cellule
        setTimeout(() => {
        cellule.textContent = proposition[i];
            cellule.classList.add('anime-pop'); //ajout de l'animation

            // comparaison des lettres pour check l'état si c'est correcte, présente ou absent
            if (proposition[i] === motCible[i]) {
                cellule.classList.add('correct');
            } else if (motCible.includes(proposition[i])) {
                cellule.classList.add('present');
            } else {
                cellule.classList.add('absent');
            }
        }, i * 150); // délai entre chaque anim des lettres définit ici sur 150ms
    }

    // incrémentation du nombre d'essai
    essais++;

    if (proposition === motCible) {     // verif si la proposition est correcte

        alert("Finalement t'es pas tant un golmute que ça. Bien joué :)");
        location.reload(); // recharge la page pour recommencer une partie automatiquement
        return;
    }

    if (essais === essaisMax) {     // verif si le joueur 'a plus de tentative

        alert("Ah ouais, en fait t'es un vrai golmute. Le mot c'était : " + motCible + ". débile va");
        location.reload();
    }

    champProposition.value = ""; // reset du champ de saisi
}

creertab(); //on charge le tableau un fois qu'il a été configuré précédement
