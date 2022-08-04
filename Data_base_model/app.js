require("./config/database").connect();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var ejs = require('ejs');
var bcrypt = require('bcrypt');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var User = require('./model/user');

var indexRouter = require('./routes/index');
//var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

  //Showing the Registration Form 
  app.get('/register',(req,res) => {
    res.render('user_registration',{
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
      UDID_Card:'',
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
          UDID_Card,
          password,
          confirm_password
        
        } = req.body;
        //check if all the necessary details are enterd

        const verifyDetails = (first_name && last_name && email && number.toString() && Aadhar_Number.toString() && Disability_Percentage.toString() && Disability_Type && password && confirm_password)
        console.log(verifyDetails)
        if(!verifyDetails) {
            return res.render('user_registration',{
            title:"Registration Page",
            messageDisplay:"Welcome to the user Regisration Section",
            message:'All the * feilds are necessary',
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
        // check if passwords match
        if(!(password===confirm_password)) {
            return res.render('user_registration',{
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
            Disablity_Type ,
            Disability_Percentage ,
            UDID_NO,
            UDID_Card,            
            password:securePassword,
    })

        // Create token
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );
    // save user token
    user.token = token;

    // return new user
    res.status(201).json(user);
  } catch(err) {
    res.send(err);
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
    // Validate user input
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }
    // Validate if user exist in our database
    const user = await User.findOne({ email });
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
      user.token = token;

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
