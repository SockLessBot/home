document.addEventListener('DOMContentLoaded', function() {
    function checkUsername() {
        const usernameInput = document.getElementById('username');
        const username = usernameInput.value.trim();
        const correctUsername = 'Bonjour'; // Remplacez par le nom d'utilisateur correct

        if (username === correctUsername) {
            // Afficher l'animation de chargement
            document.getElementById('username-check').style.display = 'none';
            document.getElementById('loading-container').style.display = 'block';
            document.getElementById('percentage').style.display = 'block';

            // Lancer l'animation de chargement
            startLoadingAnimation();
        } else {
            // Rediriger vers une page d'attente
            window.location.href = 'soon.html';
        }
    }

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
        const maxWidth = container.clientWidth;
        const maxHeight = container.clientHeight;
        let scale = Math.min(maxWidth / img.width, maxHeight / img.height);
        
        // Assurez-vous que l'image a une taille minimale visible
        const minSize = 400; // Gardez cette taille
        if (scale * img.width < minSize || scale * img.height < minSize) {
            scale = Math.max(minSize / img.width, minSize / img.height);
        }
        
        bwCanvas.width = img.width * scale;
        bwCanvas.height = img.height * scale;
        colorCanvas.width = img.width * scale;
        colorCanvas.height = colorCanvas.height = img.height * scale;

        const ctxBW = bwCanvas.getContext('2d');
        const ctxColor = colorCanvas.getContext('2d');

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
            function animate() {
                if (progress < 100) {
                    progress += 1;
                    percentageElement.textContent = `${progress}%`;
                    
                    // Animation de l'image de chargement
                    // ...

                    requestAnimationFrame(animate);
                } else {
                    // Redirection à la fin de l'animation
                    window.location.href = 'index2.html';
                }
            }
            animate();
        };
    }

// Ajout d'un écouteur d'événement pour le bouton de vérification
    document.getElementById('username-check').addEventListener('submit', function(e) {
        e.preventDefault();
        checkUsername();
    });
});
