document.addEventListener('DOMContentLoaded', function () {
    console.log("Chargement de app_index1.js");

    // Vérifier si Telegram WebApp est disponible
    if (typeof window.Telegram !== "undefined" && window.Telegram.WebApp) {
        let tg = window.Telegram.WebApp;
        tg.expand(); // Mettre l'app en plein écran

        // Récupérer les infos de l'utilisateur Telegram
        let username = tg.initDataUnsafe.user?.username || "Invité";
        let avatar = tg.initDataUnsafe.user?.photo_url || "default_avatar.png";

        console.log("Utilisateur détecté :", username);
        console.log("Avatar détecté :", avatar);

        startLoadingAnimation(username, avatar);
    } else {
        console.error("Telegram WebApp non chargé. Vérifiez que le script Telegram est bien inclus dans index.html.");
    }
});

function startLoadingAnimation(username, avatar) {
    const bwCanvas = document.getElementById('bwCanvas');
    const colorCanvas = document.getElementById('colorCanvas');
    const percentageElement = document.getElementById('percentage');

    if (!bwCanvas || !colorCanvas || !percentageElement) {
        console.error("Les éléments canvas sont introuvables.");
        return;
    }

    const ctxBW = bwCanvas.getContext('2d');
    const ctxColor = colorCanvas.getContext('2d');

    let img = new Image();
    img.src = 'AngrySockLoading.jpg';

    img.onload = function () {
        bwCanvas.width = img.width;
        bwCanvas.height = img.height;
        colorCanvas.width = img.width;
        colorCanvas.height = img.height;

        ctxBW.drawImage(img, 0, 0, bwCanvas.width, bwCanvas.height);
        let imgData = ctxBW.getImageData(0, 0, bwCanvas.width, bwCanvas.height);
        let data = imgData.data;

        for (let i = 0; i < data.length; i += 4) {
            let avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
            data[i] = avg;
            data[i + 1] = avg;
            data[i + 2] = avg;
        }
        ctxBW.putImageData(imgData, 0, 0);

        let progress = 0;
        const startTime = Date.now();

        function animate() {
            if (progress < 100) {
                progress += 1;
                percentageElement.textContent = `${progress}%`;

                ctxColor.clearRect(0, 0, colorCanvas.width, colorCanvas.height);
                const height = img.height * (progress / 100);
                ctxColor.drawImage(img, 0, img.height - height, img.width, height, 0, colorCanvas.height - height, colorCanvas.width, height);

                requestAnimationFrame(animate);
            } else {
                const elapsedTime = Date.now() - startTime;
                setTimeout(function () {
                    let redirectUrl = `index2.html?username=${encodeURIComponent(username)}&avatar=${encodeURIComponent(avatar)}`;
                    window.location.href = redirectUrl;
                }, Math.max(0, 4000 - elapsedTime));
            }
        }
        animate();
    };
}
