document.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOMContentLoaded event fired');
    const loadingScreen = document.getElementById('loadingScreen');
    const loadingCanvasBW = document.getElementById('loadingCanvasBW');
    const loadingCanvasColor = document.getElementById('loadingCanvasColor');
    const percentage = document.getElementById('percentage');
    const appContent = document.getElementById('appContent');
    
    console.log('loadingScreen:', loadingScreen);
    console.log('loadingCanvasBW:', loadingCanvasBW);
    console.log('loadingCanvasColor:', loadingCanvasColor);
    console.log('percentage:', percentage);
    console.log('appContent:', appContent);

    if (loadingScreen && loadingCanvasBW && loadingCanvasColor && percentage && appContent) {
        const ctxBW = loadingCanvasBW.getContext('2d');
        const ctxColor = loadingCanvasColor.getContext('2d');

        // Charger l'image
        const img = new Image();
        img.src = 'AngrySockLoading.jpg';
        img.onload = function() {
            console.log('Image chargée');
            // Ajuster la taille des canvas
            loadingCanvasBW.width = loadingCanvasColor.width = img.width;
            loadingCanvasBW.height = loadingCanvasColor.height = img.height;
            
            // Dessiner l'image en noir et blanc sur le canvas
            ctxBW.filter = 'grayscale(100%)';
            ctxBW.drawImage(img, 0, 0, img.width, img.height);

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
                            
                            // Mise à jour du pourcentage
                            percentage.textContent = `${progress}%`;
                            console.log(`Progression: ${progress}%`);
                        }
                    }, 20); // Ajustez la vitesse de chargement ici
                }, 2000); // Délai de 2 secondes avant le début du chargement
            }

            simulateLoading();
        };

        // Gestion d'erreur pour le chargement de l'image
        img.onerror = function() {
            console.error('Erreur lors du chargement de l\'image de chargement');
            percentage.textContent = 'Erreur de chargement';
        };
    } else {
        console.error('Un ou plusieurs éléments du DOM ne sont pas trouvés');
    }
});
// Suppression des parties non nécessaires pour l'instant
