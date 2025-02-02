img.onload = function() {
    console.log('Image chargée avec dimensions:', img.width, img.height);
    // Ajuster la taille des canvas
    loadingCanvasBW.width = loadingCanvasColor.width = img.width;
    loadingCanvasBW.height = loadingCanvasColor.height = img.height;
    console.log('Dimensions des canvas:', loadingCanvasBW.width, loadingCanvasBW.height);
    
    // Dessiner l'image en noir et blanc sur le canvas
    ctxBW.filter = 'grayscale(100%)';
    ctxBW.drawImage(img, 0, 0, img.width, img.height);
    console.log('Image dessinée en noir et blanc');

    // Fonction pour simuler le chargement avec un délai
    function simulateLoading() {
        console.log('Démarrage de simulateLoading');
        setTimeout(() => {
            let progress = 0;
            const interval = setInterval(() => {
                progress += 1;
                if (progress > 100) {
                    clearInterval(interval);
                    loadingScreen.style.display = 'none';
                    appContent.style.display = 'block';
                    console.log('Chargement terminé');
                } else {
                    // Effacer le canvas coloré
                    ctxColor.clearRect(0, 0, loadingCanvasColor.width, loadingCanvasColor.height);
                    
                    // Calculer la hauteur à coloriser
                    const heightToColor = (progress / 100) * img.height;
                    
                    // Dessiner la partie colorée sous la barre
                    ctxColor.drawImage(img, 0, img.height - heightToColor, img.width, heightToColor, 0, img.height - heightToColor, img.width, heightToColor);
                    console.log(`Partie colorée dessinée pour ${progress}%`);
                    
                    // Mise à jour du pourcentage
                    percentage.textContent = `${progress}%`;
                    console.log(`Progression: ${progress}%`);
                }
            }, 20); // Ajustez la vitesse de chargement ici
        }, 2000); // Délai de 2 secondes avant le début du chargement
    }

    simulateLoading();
};
