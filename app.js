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
