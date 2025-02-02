document.addEventListener('DOMContentLoaded', function() {
    const bwCanvas = document.getElementById('bwCanvas');
    const colorCanvas = document.getElementById('colorCanvas');
    const percentageElement = document.getElementById('percentage');
    
    let img = new Image();
    img.src = 'AngrySockLoading.jpg';

    img.onload = function() {
        const container = document.getElementById('loading-container');
        const scale = Math.min(container.clientWidth / img.width, container.clientHeight / img.height);
        
        bwCanvas.width = img.width * scale;
        bwCanvas.height = img.height * scale;
        colorCanvas.width = img.width * scale;
        colorCanvas.height = img.height * scale;

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
                
                ctxColor.clearRect(0, 0, colorCanvas.width, colorCanvas.height);
                
                const height = img.height * (progress / 100) * scale;
                ctxColor.drawImage(img, 0, img.height - height / scale, img.width, height / scale, 0, colorCanvas.height - height, colorCanvas.width, height);
                requestAnimationFrame(animate);
            } else {
                window.location.href = 'index2.html'; // Changé pour refléter le nom de la nouvelle page
            }
        }
        animate();
    };
});
