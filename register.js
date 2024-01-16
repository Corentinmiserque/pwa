if ('serviceWorker' in navigator) {
    // Enregistrez le service worker
    navigator.serviceWorker.register('service-worker.js')
    window.addEventListener('load', e => {

    })
      .then((registration) => {
        console.log('Service Worker enregistré avec succès:', registration.scope);
      })
      .catch((error) => {
        console.error("Erreur lors de l'enregistrement du Service Worker:", error);
      });
    }
    else{
        console.log("navigateur pas services workes")
    }