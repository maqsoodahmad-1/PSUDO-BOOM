var express = require('express');

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

var scheme = require('./model/user');
require("./config/database").connect();

app.post('/schemes/register', (req,res))