const passport =require('passport');
const googleStrategy=require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');
require('dotenv').config();


// tell passport to use a new strategy for google login
passport.use(new googleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL 
    },
    function(accessToken,refreshToken,profile,done){
        console.log(accessToken);
        console.log(profile);
        User.findOne({email:profile.emails[0].value},function(err,user){
            if(err){
                console.log('error in strategy');
                return;
            }
            //if user foud set user as req.user
            if(user){
                return done(null,user);
            }else{
                //if not found create the user and set it as req.user
                User.create({
                    name:profile.displayName,
                    email:profile.emails[0].value,
                    password:crypto.randomBytes(20).toString('hex')
                },function(err,user){
                    if(err){
                        console.log('error in creating google strategy',err);
                        return;
                    }
                    return done(null,user);
                }); 
            }  
        });
    }
));

module.exports = passport;