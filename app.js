//require express
const express = require('express');

//express layouts  npm i express-layouts
const expressLayouts = require('express-ejs-layouts');

//flash
const flash = require('connect-flash');
//express session
const session = require('express-session');
//passport
const passport = require('passport');

//mongoose
const mongoose = require('mongoose');
//configure database
const db = require('./config/mongoose');
const passportConfig = require('./config/passport');

//port
const port = 9800;

//use express
const app = express();
require('./config/passport')(passport);


//EJS
app.use(expressLayouts);
app.set('view engine','ejs');

//body parser
app.use(express.urlencoded({extended:false}));

//express session middleware
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true
}));
// use passport session
app.use(passport.initialize());
app.use(passport.session());

//connect flash middleware
app.use(flash());

//global vars
app.use(function(req,res,next){
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
})


//routes
app.use('/',require('./routes/index'));


//configure express server
app.listen(port,(err) =>{
    if(err){
        console.log('Error in express server');
    }
    console.log(`Successfully running on port : ${port}`);
})
