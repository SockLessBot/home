document.addEventListener('DOMContentLoaded', function () {
            function getParameterByName(name, url = window.location.href) {
                name = name.replace(/[\[\]]/g, '\\$&');
                var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
                    results = regex.exec(url);
                if (!results) return null;
                if (!results[2]) return '';
                return decodeURIComponent(results[2].replace(/\+/g, ' '));
            }

            const username = getParameterByName('username');
            const avatar = getParameterByName('avatar');

            const usernameElement = document.getElementById("username");
            const avatarElement = document.getElementById("avatar");

            if (usernameElement) {
                usernameElement.textContent = `👤 ${username || "Utilisateur inconnu"}`;
            }

            if (avatarElement) {
                avatarElement.src = avatar || "default_avatar.png";
            }
        });
