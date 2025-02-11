document.addEventListener("DOMContentLoaded", function() {
    const loadingScreen = document.getElementById('loading-screen');
    const homeScreen = document.getElementById('home-screen');
    const userAvatar = document.getElementById('user-avatar');
    const userName = document.getElementById('user-name');

    // Simuler le chargement
    setTimeout(() => {
        loadingScreen.style.display = 'none';
        homeScreen.style.display = 'block';

        // Récupérer les informations de l'utilisateur Telegram
        if (window.Telegram && window.Telegram.WebApp) {
            const user = window.Telegram.WebApp.initDataUnsafe.user;
            userAvatar.src = user.photo_url;
            userName.textContent = user.username || 'Utilisateur';
        } else {
            console.error("L'utilisateur n'est pas connecté via Telegram.");
        }
    }, 2000); // Temps de chargement simulé
});

function navigateTo(page) {
    console.log(`Naviguer vers la page : ${page}`);
    // Ajoutez ici la logique de navigation vers les différentes pages
}
