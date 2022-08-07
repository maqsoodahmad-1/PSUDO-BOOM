const publicVapidKey = "BPAQ7rO_O5J8xRJ6n_pzQ0tFC1GdUbgpeR2O8pg7UUNMje5z3tZKqg3AJe97PHM3QyxeShjxrYKGaA8vZpER61Q"

//convert public key to Uint8Array to pass into the subscribe call 
function urlBase64ToUint8Array(base64String) {
    const padding = "=".repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g,"+")
        .replace(/_/g, "/");

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for(let i = 0; i < rawData.length;++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

    const triggerPush = document.querySelector('.trigger-push');

    async function triggerPushNotification() {
        if ('serviceWorker' in navigator) {
          const register = await navigator.serviceWorker.register('/worker.js', {
            scope: '/'
          });

        const subscription = await register.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
          });     
          
          await fetch('/subscribe', {
            method: 'POST',
            body: JSON.stringify(subscription),
            headers: {
              'Content-Type': 'application/json',
            },
          });
        } else {
          console.error('Service workers are not supported in this browser');
        }
      }
      
      triggerPush.addEventListener('click', () => {
        triggerPushNotification().catch(error => console.log(error));
      });