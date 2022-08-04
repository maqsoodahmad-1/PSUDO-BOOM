var app = require('./app');
const PORT = 8080;
app.listen(PORT,(err,res) => {
    if(err){
      return  console.log(err)
    }
    console.log(`Server listening on ${PORT}`)
});