//require express
const express = require('express');

//require router 
const router = express.Router();

const {ensureAuthenticated}  = require('../config/auth');

router.get('/',(req,res) =>{
    res.render('Welcome');

});
router.use('/users',require('./users'));

router.get('/dashboard',ensureAuthenticated,function(req,res){
    console.log(req.user);
    res.render('dashboard',{
        user:req.user.name
    });
     

});



//export router
module.exports = router;
