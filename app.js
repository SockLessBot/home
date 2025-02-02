document.addEventListener('DOMContentLoaded', function() {
    function getParameterByName(name, url = window.location.href) {
        name = name.replace(/[\[\]]/g, '\\$&');
        var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }

    const username = getParameterByName('username');
    const correctUsername = 'sbst_b'; // Votre nom d'utilisateur Telegram

    // Lancer l'animation de chargement pour tous
    startLoadingAnimation();

    function startLoadingAnimation() {
        const bwCanvas = document.getElementById('bwCanvas');
        const colorCanvas = document.getElementById('colorCanvas');
        const percentageElement = document.getElementById('percentage');
        
        const ctxBW = bwCanvas.getContext('2d');
        const ctxColor = colorCanvas.getContext('2d');

        let img = new Image();
        img.src = 'AngrySockLoading.jpg';

        img.onload = function() {
            // Calculer la taille de l'image en fonction du conteneur tout en gardant l'aspect ratio
            const maxWidth = bwCanvas.clientWidth;
            const maxHeight = bwCanvas.clientHeight;
            let scale = Math.min(maxWidth / img.width, maxHeight / img.height);
            
            // Assurez-vous que l'image a une taille minimale visible
            const minSize = 400;
            if (scale * img.width < minSize || scale * img.height < minSize) {
                scale = Math.max(minSize / img.width, minSize / img.height);
            }
            
            bwCanvas.width = img.width * scale;
            bwCanvas.height = img.height * scale;
            colorCanvas.width = img.width * scale;
            colorCanvas.height = img.height * scale;

            // Dessiner l'image en noir et blanc
            ctxBW.drawImage(img, 0, 0, bwCanvas.width, bwCanvas.height);
            var imgData = ctxBW.getImageData(0, 0, bwCanvas.width, bwCanvas.height);
            var data = imgData.data;
            for (var i = 0; i < data.length; i += 4) {
                var avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
                data[i]     = avg; 
                data[i + 1] = avg; 
                data[i + 2] = avg; 
            }
            ctxBW.putImageData(imgData, 0, 0);

            let progress = 0;
            const startTime = Date.now(); // Enregistrer le temps de début de l'animation

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
                    
                    // Attendre au moins 4 secondes avant de rediriger
                    setTimeout(function() {
                        // Vérifier le nom d'utilisateur et rediriger
                        if (username === correctUsername) {
                            window.location.href = 'index2.html';
                        } else {
                            window.location.href = 'soon.html';
                        }
                    }, Math.max(0, 4000 - elapsedTime));
                }
            }
            animate();
        };
    }
});
