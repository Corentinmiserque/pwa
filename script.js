// Récupérez le bouton d'installation
const installButton = document.getElementById('installButton');

// Vérifiez si le service Worker est pris en charge par le navigateur
if ('serviceWorker' in navigator) {
  // Enregistrez le service worker
  navigator.serviceWorker.register('service-worker.js')
    .then((registration) => {
      console.log('Service Worker enregistré avec succès:', registration);
    })
    .catch((error) => {
      console.error("Erreur lors de l'enregistrement du Service Worker:", error);
    });

  // Vérifiez si l'événement `beforeinstallprompt` est disponible
  window.addEventListener('beforeinstallprompt', (event) => {
    // Empêchez l'affichage par défaut de la bannière d'installation
    event.preventDefault();
    
    // Affichez le bouton d'installation
    installButton.style.display = 'block';

    // Gérez l'événement de clic sur le bouton d'installation
    installButton.addEventListener('click', () => {
      // Affichez la bannière d'installation
      event.prompt();

      // Attend la réponse de l'utilisateur
      event.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('L\'utilisateur a accepté l\'installation de la PWA');
        } else {
          console.log('L\'utilisateur a refusé l\'installation de la PWA');
        }

        // Cachez le bouton d'installation après la tentative d'installation
        installButton.style.display = 'none';
      });
    });
  });
}
