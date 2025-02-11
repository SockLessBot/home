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

    console.log("Username récupéré :", username);
    console.log("Avatar récupéré :", avatar);

    // Lancer l'animation de chargement
    startLoadingAnimation();

    function startLoadingAnimation() {
        const bwCanvas = document.getElementById('bwCanvas');
        const colorCanvas = document.getElementById('colorCanvas');
        const percentageElement = document.getElementById('percentage');
        
        if (!bwCanvas || !colorCanvas || !percentageElement) {
            console.error("Les éléments canvas ou pourcentage sont introuvables.");
            return;
        }

        const ctxBW = bwCanvas.getContext('2d');
        const ctxColor = colorCanvas.getContext('2d');

        let img = new Image();
        img.src = 'AngrySockLoading.jpg';

        img.onload = function () {
            const maxWidth = bwCanvas.clientWidth;
            const maxHeight = bwCanvas.clientHeight;
            let scale = Math.min(maxWidth / img.width, maxHeight / img.height);
            
            const minSize = 400;
            if (scale * img.width < minSize || scale * img.height < minSize) {
                scale = Math.max(minSize / img.width, minSize / img.height);
            }
            
            bwCanvas.width = img.width * scale;
            bwCanvas.height = img.height * scale;
            colorCanvas.width = img.width * scale;
            colorCanvas.height = img.height * scale;

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
                    
                    const height = img.height * (progress / 100) * scale;
                    ctxColor.drawImage(img, 0, img.height - height / scale, img.width, height / scale, 0, colorCanvas.height - height, colorCanvas.width, height);
                    requestAnimationFrame(animate);
                } else {
                    const endTime = Date.now();
                    const elapsedTime = endTime - startTime;
                    
                    setTimeout(function () {
                        let redirectUrl = `index2.html?username=${encodeURIComponent(username || 'Invité')}&avatar=${encodeURIComponent(avatar || 'default_avatar.png')}`;
                        window.location.href = redirectUrl;
                    }, Math.max(0, 4000 - elapsedTime));
                }
            }
            animate();
        };
    }
});
