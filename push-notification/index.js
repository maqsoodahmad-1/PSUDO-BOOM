//Express 
const express = require('express');

//web-push 
const webpush = require('web-push');

//body-parser
const bodyParser = require('body-parser');

//path
const path = require('path');
const { privateDecrypt } = require('crypto');

//using express
const app = express()

//using bodyparser
app.use(bodyParser.json())

//storing the Vapid keys 
const publicVapidKey = 'BPAQ7rO_O5J8xRJ6n_pzQ0tFC1GdUbgpeR2O8pg7UUNMje5z3tZKqg3AJe97PHM3QyxeShjxrYKGaA8vZpER61Q'
const privateVapidKy = 'yKva8OxU2yVmOIf5TIrDv607aFs2X2PItc9GVKxhsaU'

//setting Vapid key details 
webpush.setVapidDetails('mailto:http://localhost:3000', publicVapidKey, privateVapidKy)

//creating a subscribe route
app.post('/subscribe', (req, res) => {
    //get push subscription object from the request

    const subscription = req.body;

    //send status 201 for the request
    res.status(201).json({});

    //create payload: specified the details of the push notification
    const payload = JSON.stringify({title: 'Section.io Push Notification'})

    //pass the object into sendNotification functon and catch any error
    webpush.sendNotification(subscription, payload)
      .catich(err => console.log(err));
})

//set the static path
app.use(express.static(path.join(__dirname, "client")))

//running the server 

const port = 3000;
app.listen(port, () => {
  console.log(`Server listning on the port ${port}`)
});