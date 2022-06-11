
const development = {
    name:'development',
    session_cookie_key:process.env.SESSION_COOKIE_KEY,
    db:process.env.DB,
    smtp:{
        host:'smtp.gmail.com',
        service:'gmail',
        port:587,
        secure:false,
        auth:{
            user:process.env.AUTH_GMAIL,
            pass:process.env.AUTH_PASS
        }

    },
    google_client_id:process.env.GOOGLE_CLIENT_ID,
    google_client_secret:process.env.GOOGLE_CLIENT_SECRET,
    google_callback_url:"http://localhost:9800/users/auth/google/callback"
}


const production = {
    name:'production',
    session_cookie_key:process.env.SESSION_COOKIE_KEY,
    db:process.env.DB,
    smtp:{
        host:'smtp.gmail.com',
        service:'gmail',
        port:587,
        secure:false,
        auth:{
            user:process.env.AUTH_GMAIL,
            pass:process.env.AUTH_PASS
        }

    },
    google_client_id:process.env.GOOGLE_CLIENT_ID,
    google_client_secret:process.env.GOOGLE_CLIENT_SECRET,
    google_callback_url:process.env.GOOGLE_CALLBACK_URL
}

module.exports = eval(process.env.AUTH_ENVIRONMENT)== undefined ? development: eval(process.env.AUTH_ENVIRONMENT)