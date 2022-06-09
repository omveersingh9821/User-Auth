const passport =require('passport');
const googleStrategy=require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User=require('../models/user');



//tell passport to use a new strategy for google login
passport.use(new googleStrategy({
    clientID:"758631718083-r0g045qit1ulqtffgu60n18kar264gar.apps.googleusercontent.com",
    clientSecret:"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",
    callbackURL:"http://localhost:9800/users/auth/google/callback"
    },

    function(accessToken,refreshToken,profile,done){
        console.log(accessToken);
        console.log(profile);
        User.findOne({email:profile.emails[0].value},function(err,user){
            if(err){
                console.log('error in strategy');
                return;
            }
         
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
                        console.log('error in creating google strategy',err);
                        return;
                    }
                    return done(null,user);
                });
              
            }  

        });
    }
));

module.exports=passport;