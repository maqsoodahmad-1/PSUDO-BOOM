// const http = require('http');
 //const app1 = require('./app');
 const express = require('express');
 const app = express();
// const server = http.createServer(app);

const { API_PORT } = process.env;
const port = process.env.PORT || API_PORT;

//Server listening

app.listen(port,() => {
    console.log(`Server running on port ${port}`);
  });
