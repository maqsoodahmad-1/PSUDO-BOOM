require("./config/database").connect();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
const jwt = require('jsonwebtoken');
const auth = require('./middlewares/auth');
var cores = require('cors');
var ejs = require('ejs');
const nodemailer = require("nodemailer");

// const userController=require('./user-controller.js/user-controller');
// const validationRule= require('./middlewares/validation-rule');
require("dotenv").config();
var bcrypt = require('bcrypt');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var multer = require('multer');
var fs = require('fs');

// var usersRouter = require('./routes/users');
var User = require('./model/user')
var verfyUser = require('./user-controller.js/verify-user')
var image = require('./model/imageSchema');
const { title } = require("process");
const sendConfirmationEmail = require('./config/nodemailer.config')

// var indexRouter = require('./routes/index');
//var usersRouter = require('./routes/users');

var app = express();
//This ip is used to send email
var corsOptions = {
  origin: "http://localhost:8081"
};


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// // SET STORAGE
// var Storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads')
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.fieldname + '-' + Date.now())
//   }
// })

// var upload = multer({ storage: Storage })

// app.use('/', indexRouter);
// app.get('/user', usersRouter);

// ap.get('/registration', userController.userForm);
// app.post('/registration',validationRule.form, userController.validateForm);
// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
app.get('/', (req, res) => {
  res.render('homepage',{
    title:"Home Page"
  })
});

  //Showing the Registration Form 
  app.get('/register',(req,res) => {
    res.render('registration',{
      title:" Regisration Page",
      messageDisplay:"Welcome to the user Regisration Section",
      message:'Kindly fill the details below',
      first_name:'',
      last_name:'',
      Guide_name:'',
      email:'',
      number:'',
      Aadhar_Number:'',
      Disablity_Type :       '',
      Disability_Percentage: '',
      UDID_NO: '',
      // UDID_Card:'',
      password:'',
      confirm_password:'',

    })
  })

// REGISTRATION LOGIC
app.post('/register', async (req, res) => {
   //our registration logic starts here
  try {
    var { first_name, 
          last_name, 
          Guide_name, 
          email, 
          number, 
          Aadhar_Number,
          Disability_Type,
          Disability_Percentage,
          UDID_NO,
          password,
          confirm_password
        
        } = req.body;

      //  check if all the necessary details are enterd
        console.log(first_name);
        console.log(last_name);
        console.log(password);
        console.log(Guide_name);
        console.log(email);
        console.log(number);
        console.log(Disability_Type);
        console.log(Disability_Percentage);
        console.log(UDID_NO);
        // console.log(UDID_Card);
        
        const verifyDetails = (first_name && last_name && email && number.toString() && Aadhar_Number.toString() && Disability_Percentage.toString() && Disability_Type && password && confirm_password)
        console.log(verifyDetails)

        if(verifyDetails) {
            return res.render('registration',{
            title:"Registration Page",
            messageDisplay:"welcome to the user Regisration Section",
            message:'All the * feilds are necessary',
            first_name:'',
            last_name:'',
            Guide_name:'',
            email:'',
            number:'',
            Aadhar_Number:'',
            Disability_Type :       '',
            Disability_Percentage: '',
            UDID_NO: '',
            UDID_Card:'',            
            password:'',
            confirm_password:''
        })
      }
        // check if passwords match
        if(!(password===confirm_password)) {
            return res.render('registration',{
            title:"Registration Page",
            messageDisplay:"Welcome to the user Regisration Section",
            message:'Confirm password must be same as password',
            first_name:'',
            last_name:'',
            Guide_name:'',
            email:'',
            number:'',
            Aadhar_Number:'',
            Disablity_Type :       '',
            Disability_Percentage: '',
            UDID_NO: '',
            UDID_Card:'',
            password:'',
            confirm_password:''

        })
        }
    const oldUser = await  User.findOne({ email });
    if( oldUser ) {
      return res.render('login', 
      {
        title:'Login Page',
        message:'User Already exists please login',
      })
    }
      
    const salt = await bcrypt.genSalt(10);
    var securePassword = await bcrypt.hash(password, salt);
    var user = await User.create({
            first_name,
            last_name,
            Guide_name,
            email,
            number,
            Aadhar_Number,
            Disability_Type ,
            Disability_Percentage ,
            UDID_NO,
            // UDID_Card: {
            //   data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
            //   contentType: 'image/png'
          // },      
            password:securePassword,
            message,
            confirmationCode:token
          })
// verifying the details were saved succeddfully
console.log(user);
// console.log(UDID_Ca

      // save user token
      // user.confirmationCode = token;
    
    //     user.save((err) => {
    //     if (err) {
    //     res.status(500).send({ message: err });
    //          return;
    //      }
    //      res.send({
    //        message:
    //          "User was registered successfully! Please check your email",
    //     });
  
    //      nodemailer.sendConfirmationEmail(
    //      user.first_name,
    //      user.email,
    //      user.confirmationCode
    //     );
    //  });
    // console.log(UDID_Card.data);
    // console.log(user)


    // return new user
   

  }
    catch(err) {
    res.send(err);
  }
});
//uploading an image

app.get('/upload', (req, res) => {
  res.render('upload',{
    title:'Upload Section',
   message:'Kindly upload your documents here'
  }
   )
 })
 app.post('/upload',(req,res, next) => {
   if(err) {
      console.log(err);
   } else {
     const newImage = new image({
       name: req.body.name,
       Description: req.body.Description,
       img: {
           data: req.file.filename,
           contentType: "image.png"
       } 
      })
     newImage
         .save()
         .then(() => res.send("Successfully saved the image"))
         .catch((err) => console.log(err));
   }
   });
 


//Login
//Showing login form


app.get("/login", function (req, res) {
res.render('login', {
title: 'Login',
message:'Welcome to login page please insert your credentials',
email: '',
password: ''     
})
});

// Our login logic starts here
app.post("/login", async(req,res) => {
  //Our Logic goes here

  try {
    // Get user input
    var { email, password } = req.body;
    console.log(password)
    // Validate user inputwhat is ocr
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }
    // Validate if user exist in our database
    const user = await User.findOne({ email });
    if(User.status != "Active") {
      return res.status(401).send({
        message: "Pending Account. Please Verify Your Email!",
      });
    } 
    const saltRounds = 10;
    // const salt = await bcrypt.genSalt(saltRounds);
    // var securePassword = await bcrypt.hash(password,salt)
   // Password matching
    const ismatch = await bcrypt.compare(password, user.password 
    //   ,(err,res) => {
    //   if(err){
    //     console.log('Comparision Error', err);
    //   }
    // }
    )

    if (ismatch) 
    // if(user && (password===user.password))
    {
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );

      // save user token
      user.confirmationCode = token;

      // user
       return res.status(200).json(user);
    } 
   
    else {res.status(400).send("Invalid Credentials");}
  } catch (err) {
    console.log(err);
  }
  // Our register logic ends here

});

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;
