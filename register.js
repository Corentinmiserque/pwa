if ('serviceWorker' in navigator) {
    // Enregistrez le service worker
    navigator.serviceWorker.register('service-worker.js')
      .then((registration) => {
        console.log('Service Worker enregistré avec succès:', registration.scope);
      })
      .catch((error) => {
        console.error("Erreur lors de l'enregistrement du Service Worker:", error);
      });
  
    // Attendez que la page soit complètement chargée pour ajouter d'autres fonctionnalités si nécessaire
    window.addEventListener('load', (event) => {
      // Ajoutez d'autres fonctionnalités après le chargement de la page si nécessaire
    });
  } else {
    console.log("Le navigateur ne prend pas en charge les service workers.");
  }
  