// Récupérez le bouton d'installation
const installButton = document.getElementById('installButton');

let myNotification = null

  // Vérifiez si l'événement `beforeinstallprompt` est disponible
  window.addEventListener('beforeinstallprompt', (event) => {
    // Empêchez l'affichage par défaut de la bannière d'installation
    event.preventDefault();

    // Vérifiez si le navigateur est sur iOS
    const isiOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

    // Affichez le bouton d'installation uniquement si ce n'est pas iOS
    if (!isiOS) {
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
    }
  });

 
  const apiUrl = 'https://api.punkapi.com/v2/beers/random';

  
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const beerListContainer = document.querySelector('#beerList');


      const beerElements = data.map(beer => `<p>${beer.name}</p>`);

      beerListContainer.innerHTML = beerElements.join('');
    })
    .catch(error => console.error('Erreur lors de la récupération des bières:', error));
  

//notification

const notifyMe = () => {
  const options = {
    body: "envoyer par pierre",
    icon: 'icons/favicon-32x32.png',
    vibrate:[200,100,200,100,200,100,200],
    url: "https://lesoir.be"
  }
    if (!("Notification" in window)) {
        alert('Pas de notification dans ce navigateur');
    } else if (Notification.permission === 'granted') {
      myNotification = new Notification ('hi me' , options)
        console.log('Notification possible');
    } else { // Demander la permission
        Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
                console.log('Notification possible');
                myNotification = new Notification ('hi thank you' , options)
            }
        });
    }
};

if(Notification.permission !== "granted"){
    if(confirm('recevoir notification?')){
        notifyMe()
    }
}

const $btbNotify = document.querySelector('.notification').addEventListener('click', e => {
  e.preventDefault()
  notifyMe()
})