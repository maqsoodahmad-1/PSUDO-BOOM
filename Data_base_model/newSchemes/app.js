var express = require('express');
var path = require('path');
var User = require('./model/user')
const app = express();

app.post('/schemes/register', async(req, res) => {
    try {  
    const {
    //  SchemeName,
     SchemeType,
     SchemeDescription,
     schemeTitle,
     SchemeCategory,
     DisabilityCriteria,
     DisabiltityType,
     TypeOfBenifits,
     LaunchDate,
      } = await req.body;
  
  // res.send(SchemeName);
  const SchemeDetails = await Schemes.create({
    SchemeType,
    schemeTitle,
    DisabilityCriteria,
    SchemeDescription,
    DisabiltityType,
    TypeOfBenifits,
    LaunchDate,
    SchemeCategory,
  
  })
  console.log(SchemeDetails);
  res.send(SchemeDetails);
  } catch(err) {
    res.send(err);
  }
  }
  )