const { application } = require("express");
const { sendNotification } = require("web-push");

if('serviceWorker' in navigator) {
    send().catch(err => console.log(err))
}

//register the ServiceWorker,register our push api and send the notification
async function send() {
    //register the service worker
    const register =  await navigator.serviceWorker.register('/worker.js', {
        scope:'/'
    });

    //register push 
    const subscription = await register.pushManager.subscribe({
        userVisibleOnly: true,

        //register public Vapid key 
        applicationServerKey:urlBase64ToUintArray(publicVapidKey)
    })

    //send push notification 
    await fetch("/subscribe", {
        method: "POST",
        body: JSON.stringify(subscription),
        headers: {
            "content-type": "application/json"
        }
    });
}