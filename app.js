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
