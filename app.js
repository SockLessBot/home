document.addEventListener('DOMContentLoaded', (event) => {
    if (window.Telegram.WebApp) {
        window.Telegram.WebApp.ready();
        window.Telegram.WebApp.expand();

        let user = window.Telegram.WebApp.initDataUnsafe.user;
        if (user) {
            document.getElementById('app').textContent = `Bienvenue, ${user.first_name}!`;
        }
    } else {
        alert("Cette page est conçue pour être ouverte via Telegram.");
    }
});
document.addEventListener('DOMContentLoaded', (event) => {
    if (window.Telegram.WebApp) {
        window.Telegram.WebApp.ready();
        window.Telegram.WebApp.expand();

        // Ajoute ici la logique de ton jeu ou interaction
        let welcomeMessage = document.getElementById('app');
        let playButton = document.createElement('button');
        playButton.textContent = 'Jouer';
        playButton.onclick = function() {
            // Logique du jeu ici
            alert('Tu as cliqué sur Jouer!');
            // Par exemple, tu pourrais changer le texte de bienvenue
            welcomeMessage.textContent = 'Le jeu commence!';
        };
        document.body.appendChild(playButton);
    } else {
        alert("Cette page est conçue pour être ouverte via Telegram.");
    }
});
