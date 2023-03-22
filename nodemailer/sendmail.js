const res = require('express/lib/response');
const nodemailer = require('nodemailer');

require('dotenv').config();


module.exports.sendEmail = (user,token)=>{
    try {
        const transporter = nodemailer.createTransport({
            host:'smtp.gmail.com',
            service:'gmail',
            port:587,
            secure:false,
            auth:{
                user:process.env.AUTH_GMAIL,
                pass:process.env.AUTH_PASS
            }
    
        });

        let info = transporter.sendMail({
            from: '"User Auth"<omveersingh9821@gmail.com>', // sender address
            to: user.email, 
            subject: "Reset Password", 
            html: `<p>Hii ${user.name} please click here to <a href="https://user-auth-o818.onrender.com/users/reset-password?token=${token}">Reset</a>your password</p>`, 
        });
        console.log('message sent ',info);
           

    } catch (error) {
        console.log('error in nodemailer',error);
    }
}