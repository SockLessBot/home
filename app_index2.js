document.addEventListener('DOMContentLoaded', function () {
    console.log("Chargement de app_index2.js après le DOM");

    function getParameterByName(name, url = window.location.href) {
        name = name.replace(/[\[\]]/g, '\\$&');
        let regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }

    let username = getParameterByName('username') || sessionStorage.getItem('username') || "Utilisateur inconnu";
    let avatar = getParameterByName('avatar') || sessionStorage.getItem('avatar') || "default_avatar.png";

    console.log("Nom récupéré :", username);
    console.log("Avatar récupéré :", avatar);

    // Vérification que les éléments existent bien avant de les modifier
    const usernameElement = document.getElementById("username");
    const avatarElement = document.getElementById("avatar");
    const welcomeMessageElement = document.getElementById("welcomeMessage");

    if (usernameElement) {
        usernameElement.textContent = `👤 ${username}`;
    } else {
        console.error("Élément username introuvable.");
    }

    if (avatarElement) {
        avatarElement.src = avatar;
    } else {
        console.error("Élément avatar introuvable.");
    }

    if (welcomeMessageElement) {
        const currentHour = new Date().getHours();
        let greeting;
        if (currentHour < 12) {
            greeting = "Bonjour";
        } else if (currentHour < 18) {
            greeting = "Bon après-midi";
        } else {
            greeting = "Bonsoir";
        }
        welcomeMessageElement.textContent = `${greeting}, ${username}!`;
    }

    // Sauvegarde dans sessionStorage pour éviter la perte après navigation
    sessionStorage.setItem('username', username);
    sessionStorage.setItem('avatar', avatar);

    // Ajout d'un bouton de déconnexion
    const logoutButton = document.getElementById("logoutButton");
    if (logoutButton) {
        logoutButton.addEventListener('click', function () {
            sessionStorage.removeItem('username');
            sessionStorage.removeItem('avatar');
            window.location.reload();
        });
    }

    // Enregistrer le temps de connexion et le nombre de connexions
    let connectionCount = localStorage.getItem('connectionCount') || 0;
    connectionCount = parseInt(connectionCount) + 1;
    localStorage.setItem('connectionCount', connectionCount);
    localStorage.setItem('lastConnectionTime', new Date().toISOString());

    // Enregistrer le nombre de tapotements
    let tapCount = localStorage.getItem('tapCount') || 0;
    const sockElement = document.getElementById("sock");

    sockElement.addEventListener('click', function () {
        tapCount = parseInt(tapCount) + 1;
        localStorage.setItem('tapCount', tapCount);
        sockElement.classList.add('clicked');
        setTimeout(() => sockElement.classList.remove('clicked'), 500);
    });

    // Envoyer les données au serveur
    function sendDataToServer() {
        const data = {
            username: username,
            lastConnectionTime: localStorage.getItem('lastConnectionTime'),
            connectionCount: connectionCount,
            tapCount: tapCount
        };

        fetch('https://votre-serveur.com/endpoint', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Données envoyées avec succès:', data);
        })
        .catch((error) => {
            console.error('Erreur lors de l\'envoi des données:', error);
        });
    }

    // Envoyer les données au chargement de la page
    sendDataToServer();
});
