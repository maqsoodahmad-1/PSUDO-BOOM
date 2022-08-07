const nodemailer = require("nodemailer");
require("dotenv").config();

const user = process.env.user;
const password = process.env.password;

const transport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: user,
        password:password,
    },
})

module.exports.sendConfirmationEmail = (first_name, email, confirmationCode) => {
    console.log("Check");
    transport.sendMail({
        from: user,
        to: email,
        subject:"Please confirm your account",
        html: `<h1>Email Confirmation</h1><h2>Hello ${first_name} </h2><p>Thank you for subscribing.Please confirm your email by clicking on the link below</p>
            <a href=https://localhost:8081/confirm/${confirmationCode}>Click here</a>
                        </div>` ,              
                

    }).catch(err => console.log(err));
};

// user.save((err) => {
//     if (err) {
//       res.status(500).send({ message: err });
//            return;
//         }
//        res.send({
//            message:
//              "User was registered successfully! Please check your email",
//         });

//       nodemailer.sendConfirmationEmail(
//          user.username,
//          user.email,
//          user.confirmationCode
//   );
// });