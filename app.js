document.addEventListener('DOMContentLoaded', function() {
    const bwCanvas = document.getElementById('bwCanvas');
    const colorCanvas = document.getElementById('colorCanvas');
    const percentageElement = document.getElementById('percentage');
    
    const ctxBW = bwCanvas.getContext('2d');
    const ctxColor = colorCanvas.getContext('2d');

    let img = new Image();
    img.src = 'AngrySockLoading.jpg';

    img.onload = function() {
        // Dessiner l'image en noir et blanc
        ctxBW.drawImage(img, 0, 0, 300, 300);
        var imgData = ctxBW.getImageData(0, 0, 300, 300);
        var data = imgData.data;
        for (var i = 0; i < data.length; i += 4) {
            var avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
            data[i]     = avg; // rouge
            data[i + 1] = avg; // vert
            data[i + 2] = avg; // bleu
        }
        ctxBW.putImageData(imgData, 0, 0);

        // Animation de coloration
        let progress = 0;
        function animate() {
            if (progress < 100) {
                progress += 1;
                percentageElement.textContent = `${progress}%`;
                
                // Effacer le canvas de couleur
                ctxColor.clearRect(0, 0, 300, 300);
                
                // Dessiner la partie colorée de l'image
                const height = img.height * (progress / 100);
                ctxColor.drawImage(img, 0, img.height - height, img.width, height, 0, 300 - (300 * (progress / 100)), 300, 300 * (progress / 100));
                requestAnimationFrame(animate);
            } else {
                // Redirection à la fin de l'animation
                window.location.href = 'index2.html'; // Remplacez par l'URL de votre nouvelle page
            }
        }
        animate();
    };
});
