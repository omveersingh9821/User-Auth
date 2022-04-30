const passport =require('passport');
const googleStrategy=require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User=require('../models/user');



//tell passport to use a new strategy for google login
passport.use(new googleStrategy({
    clientID:"840608695207-knegrkhvtk0l8cg4emimtunu9ldq08ep.apps.googleusercontent.com",
    clientSecret:"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",
    callbackURL:"http://localhost:9800/users/auth/google/callback"
    },
    function(accessToken,refreshToken,profile,done){
        User.findOne({email:profile.emails[0].value}).exec(function(err,user){
            //find user
            if(err){
                console.log('error in google strategy passport',err);
                return;
            }
            console.log(profile);
            if(user){
                //if user foud set user as req.user
                return done(null,user);
            }else{
                //if not found create the user and set it as req.user
                User.create({
                    name:profile.displayName,
                    email:profile.emails[0].value,
                    password:crypto.randomBytes(20).toString('hex')
                },function(err,user){
                    if(err){
                        console.log('error in creating user in google strategy passport',err);
                        return;
                    }
                    return done(null,user);
                })
            }
        })
    }

))
module.exports=passport;