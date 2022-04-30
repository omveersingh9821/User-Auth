const express = require('express');
const passport = require('passport');
//require model
const User = require('../models/user');
const Otp = require('../models/otp');
//bcrypt
const bcrypt = require('bcryptjs');


//handle registration
module.exports.userRegistration = function(req,res){
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

}
//handle login
module.exports.logIn = (req,res,next)=>{
    passport.authenticate('local',{
        successRedirect: '/users/dashboard',
        failureRedirect: '/users/login',
        failureFlash:true
    })(req,res,next);
    req.flash('success_msg','You are log in successfully')
}

//handle logout
module.exports.logOut = (req,res)=>{
    req.logOut();
    req.flash('success_msg','You are logged out')
    res.redirect('/users/login');
}

//change password
module.exports.changePassword =async (req,res)=>{
    const {current,password,password2} = req.body;
    if(password!=password2){
        req.flash('error_msg','Password do not Match');
        return res.redirect('back'); 
    }
    if(password.length < 6){
        req.flash('error_msg','Passwords should be at least 6 characters');
        return res.redirect('back'); 
    }
    else{
        req.body.password = await bcrypt.hash(req.body.password, 10);
        await User.findByIdAndUpdate(req.user.id,req.body);
        req.flash('success_msg','Password changed successfully');
        return res.redirect('/users/dashboard');
    }
    
}

//password forget
module.exports.emailSend = async(req,res)=>{
    return res.render('forget_password');
}




