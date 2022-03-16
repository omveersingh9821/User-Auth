//require express
const express = require('express');
const { append } = require('express/lib/response');
const passport = require('passport');
const LocalStrategy =require('passport-local').Strategy;


//require model
const User = require('../models/user');
//bcrypt
const bcrypt = require('bcryptjs');

//require router 
const router = express.Router();


//Login Page
router.get('/login',(req,res) =>{
    res.render('login');
});
//Register Page
router.get('/register',(req,res) =>{
    res.render('register');

});

//Register Handle
router.post('/register',(req,res) => {
    // console.log(req.body);
    const { name , email , password ,password2 } = req.body;
    const errors = [];
    //check required fields
    if(!name || !email || !password || !password2){
        errors.push({msg:'Please fill in all fields'});
    }
    //check password match
    if(password != password2){
        errors.push({msg:'Passwords do not match'});
    }

    //check password length
    if(password.length < 6){
        errors.push({msg:'Passwords should be at least 6 characters'});
    }
    if(errors.length > 0){
        res.render('register',{
            errors,
            name,
            email,
            password,
            password2
        })

    }else{
        //validation passed
        User.findOne({email:email})
        .then(user => {
            if(user){
                //user exists
                errors.push({msg:'Email is already registered'});
                res.render('register',{
                    errors,
                    name,
                    email,
                    password,
                    password2
                });
            }else{
                const newUser = new User({name,email,password});
                //Hash password
                bcrypt.genSalt(10, (err,salt) => bcrypt.hash(newUser.password,salt,(err,hash) =>{
                    if(err){
                        throw err;
                    }
                    //set password to hashed
                    newUser.password = hash;
                    //save the user
                    newUser.save()
                    .then(user => {
                        req.flash('success_msg','You are now registered and can log in');
                        res.redirect('/users/login');

                    })
                    .catch(err => console.log(err));

                }));
            }
        })
    
    }
});

//login handle
router.post('/login',(req,res,next) =>{
    passport.authenticate('local',{
        successRedirect: '/dashboard',
        failureRedirect: '/users/login',
        failureFlash:true
    })(req,res,next);
    
    
});

//logout handle
router.get('/logout',(req,res)=>{
    req.logOut();
    req.flash('success_msg','You are logged out')
    res.redirect('/users/login');

}) 


//export router
module.exports = router;
