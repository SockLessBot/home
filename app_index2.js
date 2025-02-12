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

    // Sauvegarde dans sessionStorage pour éviter la perte après navigation
    sessionStorage.setItem('username', username);
    sessionStorage.setItem('avatar', avatar);
});
