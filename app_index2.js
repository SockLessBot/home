import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth-compat.js";
import { getDatabase, ref, once, set, update } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database-compat.js";

const firebaseConfig = {
    apiKey: "AIzaSyC4QIw5_DPLV1jgWXD_6cwCcSJ45beVJPs",
    authDomain: "socklessbot-4cb16.firebaseapp.com",
    projectId: "socklessbot-4cb16",
    storageBucket: "socklessbot-4cb16.firebasestorage.app",
    messagingSenderId: "217505348422",
    appId: "1:217505348422:web:ba081cecab0f3e9d584347"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

document.addEventListener('DOMContentLoaded', function () {
    console.log("Chargement de app_index2.js après le DOM");

    function getParameterByName(name, url = window.location.href) {
        name = name.replace(/[\\[\\]]/g, '\\$&');
        let regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }

    let telegramUsername = getParameterByName('username') || sessionStorage.getItem('username');
    let avatar = getParameterByName('avatar') || sessionStorage.getItem('avatar') || "default_avatar.png"; // On s'en fout pour l'instant

    if (!telegramUsername) {
        window.location.href = "soon.html";
        return;
    }

    console.log("Nom récupéré :", telegramUsername);
    console.log("Avatar récupéré :", avatar);

    const usernameElement = document.getElementById("username");

    if (usernameElement) {
        usernameElement.textContent = ` ${telegramUsername}`;
    } else {
        console.error("Élément username introuvable.");
    }

    let connectionCount = localStorage.getItem('connectionCount') || 0;
    connectionCount = parseInt(connectionCount) + 1;
    localStorage.setItem('connectionCount', connectionCount);
    console.log("Nombre de connexions:", connectionCount);

    localStorage.setItem('lastConnectionTime', new Date().toISOString());

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

        if (tapCountDisplay) {
            tapCountDisplay.textContent = tapCount;
        }

        sendDataToServer();
    });

    async function handleTelegramAuth() {
        let attempts = 0;
        const maxAttempts = 3;

        while (attempts < maxAttempts) {
            try {
                const snapshot = await once(ref(database, 'users/' + telegramUsername), 'value');
                if (snapshot.exists()) {
                    console.log("Utilisateur existant, connexion en cours...");
                    await signInWithEmailAndPassword(auth, telegramUsername + "@telegram.com", "defaultpassword");
                    console.log("Utilisateur connecté avec succès");
                } else {
                    console.log("Nouvel utilisateur, création en cours...");
                    await createUserWithEmailAndPassword(auth, telegramUsername + "@telegram.com", "defaultpassword");
                    console.log("Utilisateur créé avec succès");
                }
                sendDataToServer();
                return;
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

    function sendDataToServer() {
        const user = auth.currentUser;
        if (user) {
            const data = {
                username: user.uid,
                lastConnectionTime: localStorage.getItem('lastConnectionTime'),
                connectionCount: localStorage.getItem('connectionCount'),
                tapCount: localStorage.getItem('tapCount')
            };

            set(ref(database, 'users/' + user.uid), data)
                .then(() => {
                    console.log('Données envoyées avec succès à Firebase');
                })
                .catch((error) => {
                    console.error('Erreur lors de l\'envoi des données:', error);
                });
        } else {
            console.error('Aucun utilisateur authentifié');
        }
    }

    handleTelegramAuth();
});
