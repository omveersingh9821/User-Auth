//require the library
const mongoose = require('mongoose');

//require env
const env = require('./environment');

// connect to the database
// mongoose.connect(`mongodb://0.0.0/${process.env.DB}`); 
mongoose.connect("mongodb://0.0.0/user_authentication" ); 

// mongoose.connect(env.db);

// acquire the connection to check if it is successfull
const db=mongoose.connection;

//error
db.on('error',console.error.bind(console,'error connection to db'));

//successful
db.once('open',function(){
    console.log('successfull connected to the database');
});

module.exports = db;