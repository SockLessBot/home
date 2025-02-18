document.addEventListener('DOMContentLoaded', function () {
    console.log("Chargement de app_index2.js après le DOM");

    const firebaseConfig = {
        apiKey: "AIzaSyAG6168t9L96Wz8MTj195blr7LJA1dtZEI",
        authDomain: "socklessbot-52f51.firebaseapp.com",
        databaseURL: "https://socklessbot-52f51-default-rtdb.europe-west1.firebasedatabase.app",
        projectId: "socklessbot-52f51",
        storageBucket: "socklessbot-52f51.firebasestorage.app",
        messagingSenderId: "888488399692",
        appId: "1:888488399692:web:7d7d7e9f82eadc117ef5e9",
        measurementId: "G-5G1BJ3L3DS"
    };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    console.log("Firebase initialisé avec succès");

    // Initialize Authentication and Database
    const auth = firebase.auth();
    const database = firebase.database();

    function getParameterByName(name, url = window.location.href) {
        name = name.replace(/[\\[\\]]/g, '\\$&');
        let regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }

    let telegramUsername = getParameterByName('username') || sessionStorage.getItem('username');
    let avatar = getParameterByName('avatar') || sessionStorage.getItem('avatar') || "default_avatar.png";

    if (!telegramUsername) {
        window.location.href = "soon.html";
        return;
    }

    console.log("Nom récupéré :", telegramUsername);
    console.log("Avatar récupéré :", avatar);

    // Vérification que les éléments existent bien avant de les modifier
    const usernameElement = document.getElementById("username");
    const avatarElement = document.getElementById("avatar");

    if (usernameElement) {
        usernameElement.textContent = `👤 ${telegramUsername}`;
    } else {
        console.error("Élément username introuvable.");
    }

    if (avatarElement) {
        avatarElement.src = avatar;
        avatarElement.alt = `Avatar de ${telegramUsername}`;
    } else {
        console.error("Élément avatar introuvable.");
    }

    // Enregistrer le nombre de connexions
    let connectionCount = localStorage.getItem('connectionCount') || 0;
    connectionCount = parseInt(connectionCount) + 1;
    localStorage.setItem('connectionCount', connectionCount);
    console.log("Nombre de connexions:", connectionCount);

    // Enregistrer la dernière heure de connexion
    localStorage.setItem('lastConnectionTime', new Date().toISOString());

    // Enregistrer le nombre de tapotements
    let tapCount = localStorage.getItem('tapCount') || 0;
    const sockElement = document.getElementById("sock");
    const tapCountDisplay = document.getElementById('tapCountDisplay');

    if (tapCountDisplay) {
        tapCountDisplay.textContent = tapCount;
    }

    sockElement.addEventListener('click', function () {
        tapCount = parseInt(tapCount) + 1;
        localStorage.setItem('tapCount', tapCount);
        sockElement.classList.add('clicked');
        setTimeout(() => sockElement.classList.remove('clicked'), 500);

        // Mettre à jour l'affichage du nombre de tapotements
        if (tapCountDisplay) {
            tapCountDisplay.textContent = tapCount;
        }

        // Mettre à jour les données dans Firebase
        sendDataToServer();
    });

    async function handleTelegramAuth() {
        const telegramUserId = telegramUsername; // Utilisez un identifiant unique pour Telegram
        let attempts = 0;
        const maxAttempts = 3;

        while (attempts < maxAttempts) {
            try {
                const user = auth.currentUser;
                if (user) {
                    console.log("Utilisateur authentifié:", user.uid);
                } else {
                    console.log("Aucun utilisateur authentifié, tentative de connexion...");
                }

                const snapshot = await database.ref('users/' + telegramUserId).once('value');
                if (snapshot.exists()) {
                    // L'utilisateur existe, connectez-le
                    console.log("Utilisateur existant, connexion en cours...");
                    await auth.signInWithCustomToken(telegramUserId);
                    console.log("Utilisateur connecté avec succès");
                    sendDataToServer();
                    return;
                } else {
                    // L'utilisateur n'existe pas, créez-le
                    console.log("Nouvel utilisateur, création en cours...");
                    await auth.createUserWithEmailAndPassword(telegramUserId + "@telegram.com", "defaultpassword");
                    console.log("Utilisateur créé avec succès");
                    sendDataToServer();
                    return;
                }
            } catch (error) {
                attempts++;
                console.error(`Tentative ${attempts} échouée:`, error);
                if (attempts === maxAttempts) {
                    console.error("Trois tentatives échouées, redirection vers la page de maintenance.");
                    window.location.href = "soon.html";
                }
            }
        }
    }

    // Envoyer les données au serveur
    function sendDataToServer() {
        const user = auth.currentUser;
        if (user) {
            const data = {
                username: user.uid, // Utiliser l'UID de l'utilisateur authentifié
                lastConnectionTime: localStorage.getItem('lastConnectionTime'),
                connectionCount: connectionCount,
                tapCount: tapCount
            };

            // Envoi des données à Firebase Realtime Database
            database.ref('users/' + user.uid).set(data, (error) => {
                if (error) {
                    console.error('Erreur lors de l\'envoi des données:', error);
                } else {
                    console.log('Données envoyées avec succès à Firebase');
                }
            });
        } else {
            console.error('Aucun utilisateur authentifié');
        }
    }

    // Gérer l'authentification au chargement de la page
    handleTelegramAuth();
});
