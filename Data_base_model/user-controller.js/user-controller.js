const { validationResult, matchedData } = require('express-validator');
module.exports={
    userForm:function(req, res) {
        res.render('user-form');
    },
    validateForm:function(req,res){
        const errors= validationResult(req);
        if(!errors.isEmpty()){
          var errMsg= errors.mapped();
          var inputData = matchedData(req);  
    
         }else{
            var inputData = matchedData(req);  
           // insert query will be written here
        }
          res.render('user-form', {errors:errMsg, inputData:inputData});
    }
}