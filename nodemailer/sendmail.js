const res = require('express/lib/response');
const nodemailer = require('nodemailer');

const env = require('../config/environment');


module.exports.sendEmail = (user,token)=>{
    try {
        const transporter = nodemailer.createTransport(env.smtp);

        let info = transporter.sendMail({
            from: '"User Auth"<userauthentication98@gmail.com>', // sender address
            to: user.email, 
            subject: "Reset Password", 
            html: `<p>Hii ${user.name} please click here to <a href="https://user-auth-om.herokuapp.com/users/reset-password?token=${token}">Reset</a>your password</p>`, 
        });
        console.log('message sent ',info.messageId);
           

    } catch (error) {
        console.log('error in nodemailer',error);
    }
}