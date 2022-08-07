const User = require("../model/user")
exports.verfyUser = (req, res, next) => {
    User.findOne({
        confirmationCode: req.params.confirmationCode,
    })
      .then((user) => {
          if(!user)  {
                return res.status(404).send({message:'user not found'})
          }
          user.status = "Active";
          user.save((err) => {
            if(err) {
              res.status(500).send({message:err})
              return;
            }
         })

     })
     .catch((e) => {
        console.log('error', e)
     }
     )
}