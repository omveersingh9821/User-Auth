const res = require('express/lib/response');
const nodemailer = require('nodemailer');


module.exports.sendEmail = async(user,token)=>{
    try {
        const transporter =await nodemailer.createTransport({
            host:'smtp.gmail.com',
            service:'gmail',
            port:587,
            secure:false,
            auth:{
                user:'userauthentication98@gmail.com',
                pass:'tjxcvyljeozhpggr'
            }

        });

        let info = await transporter.sendMail({
            from: '"User Auth"<userauthentication98@gmail.com>', // sender address
            to: user.email, 
            subject: "Reset Password", 
            html: `<p>Hii ${user.name} please click here to <a href="http://localhost:9800/users/reset-password?token=${token}">Reset</a>your password</p>`, 
        });
        console.log('message sent ',info.messageId);
           

    } catch (error) {
        console.log('error in nodemailer',error);
    }
}