// Chargement
document.addEventListener('DOMContentLoaded', (event) => {
    const loadingScreen = document.getElementById('loadingScreen');
    const loadingCanvasBW = document.getElementById('loadingCanvasBW');
    const loadingCanvasColor = document.getElementById('loadingCanvasColor');
    const loadingBar = document.getElementById('loadingBar');
    const appContent = document.getElementById('appContent');
    const ctxBW = loadingCanvasBW.getContext('2d');
    const ctxColor = loadingCanvasColor.getContext('2d');

    // Charger l'image
    const img = new Image();
    img.src = 'AngrySockLoading.jpg';
    img.onload = function() {
        // Ajuster la taille des canvas
        loadingCanvasBW.width = loadingCanvasColor.width = img.width;
        loadingCanvasBW.height = loadingCanvasColor.height = img.height;
        
        // Dessiner l'image en noir et blanc sur le canvas
        ctxBW.filter = 'grayscale(100%)';
        ctxBW.drawImage(img, 0, 0, img.width, img.height);

        // Fonction pour simuler le chargement avec un délai
        function simulateLoading() {
            setTimeout(() => {
                let progress = 0;
                const interval = setInterval(() => {
                    progress += 1;
                    if (progress > 100) {
                        clearInterval(interval);
                        loadingScreen.style.display = 'none';
                        appContent.style.display = 'block';
                    } else {
                        // Effacer le canvas coloré
                        ctxColor.clearRect(0, 0, loadingCanvasColor.width, loadingCanvasColor.height);
                        
                        // Calculer la hauteur à coloriser
                        const heightToColor = (progress / 100) * img.height;
                        
                        // Dessiner la partie colorée sous la barre
                        ctxColor.drawImage(img, 0, img.height - heightToColor, img.width, heightToColor, 0, img.height - heightToColor, img.width, heightToColor);
                        
                        // Ajuster la position de la barre de chargement pour qu'elle parte du bas
                        loadingBar.style.transform = `translateX(-50%) translateY(${-heightToColor}px)`;
                    }
                }, 20); // Ajustez la vitesse de chargement ici
            }, 2000); // Délai de 2 secondes avant le début du chargement
        }

        simulateLoading();
    };
});


document.addEventListener('DOMContentLoaded', (event) => {
    if (window.Telegram.WebApp) {
        window.Telegram.WebApp.ready();
        window.Telegram.WebApp.expand();

        let user = window.Telegram.WebApp.initDataUnsafe.user;
        if (user) {
            // Initialisation du message de bienvenue avec le nom de l'utilisateur
            document.getElementById('app').textContent = `Bienvenue, ${user.first_name}!`;
        }

        // Ajout du bouton "Jouer"
        let welcomeMessage = document.getElementById('app');
        let playButton = document.createElement('button');
        playButton.textContent = 'Jouer';
        playButton.onclick = function() {
            // Logique du jeu ici
            alert('Tu as cliqué sur Jouer!');
            // Changement du message de bienvenue pour indiquer que le jeu commence
            welcomeMessage.textContent = 'Le jeu commence!';
        };
        document.body.appendChild(playButton);
    } else {
        alert("Cette page est conçue pour être ouverte via Telegram.");
    }
});

// Fonction pour initialiser l'application
function initApp() {
    console.log('Application initialisée');
    document.getElementById('findSockBtn').addEventListener('click', findASock);
    document.getElementById('investigateBtn').addEventListener('click', investigate);
    document.getElementById('accuseAliceBtn').addEventListener('click', () => accuse('Alice'));
    document.getElementById('accuseBobBtn').addEventListener('click', () => accuse('Bob'));
    document.getElementById('accuseCharlieBtn').addEventListener('click', () => accuse('Charlie'));
    
    // Initialisation du jeu Phaser serait ici si nécessaire
}

// Fonction pour le jeu "Find a Sock"
function findASock() {
    const socks = ['🧦', '🧦', '❓'];
    const chosenSock = socks[Math.floor(Math.random() * socks.length)];
    
    if (chosenSock === '❓') {
        alert("La chaussette n'était pas là, essayez encore!");
    } else {
        alert("Félicitations! Vous avez trouvé une chaussette!");
    }
}

// Fonctions pour le jeu "Qui a volé la chaussette ?"
let suspects = ['Alice', 'Bob', 'Charlie'];
let clues = ['Empreinte de pas', 'Fibre de chaussette', 'Inscription mystérieuse'];
let thief = suspects[Math.floor(Math.random() * suspects.length)];

function investigate() {
    let clueIndex = Math.floor(Math.random() * clues.length);
    alert("Indice: " + clues[clueIndex]);
}

function accuse(suspect) {
    if (suspect === thief) {
        alert("Correct! " + suspect + " a volé la chaussette!");
    } else {
        alert("Faux! " + suspect + " n'est pas le voleur.");
    }
}

// Configuration de base pour le jeu Phaser "Sock Rain Dash"
var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

function preload() {
    // Charger des assets ici
    // Exemple : this.load.image('sock', 'assets/sock.png');
}

function create() {
    // Configuration de la scène de jeu
    // Exemple : Ajouter des sprites et gérer les collisions
}

function update() {
    // Logique de jeu ici
    // Déplacement des éléments, gestion des collisions, etc.
}

// Initialisation lorsque le DOM est chargé
document.addEventListener('DOMContentLoaded', (event) => {
    initApp(); // Appel à votre fonction d'initialisation existante
    // Ajoutez ici toute initialisation supplémentaire nécessaire pour les nouveaux jeux
});
