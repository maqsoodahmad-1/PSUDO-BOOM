var app = require('./app');
var express = require('express');
const PORT = 8080;
app.listen(PORT,(err,res) => {
    if(err){
      return  console.log(err)
    }
    console.log(`Server listening on ${PORT}`)
});