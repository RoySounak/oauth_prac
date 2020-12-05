const express = require('express')
const app = express()  //invoke
const mongoose = require('mongoose')
const keys = require('./config/keys')
const cookieSession = require('cookie-session')
const passport = require('passport')
const PORT = process.env.PORT || 5000

require('./models/Client')

require('./services/passport')

mongoose.connect(keys.mongoURL,()=>{
    console.log("Connect with DB")
})
//create
app.use(cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys:[keys.cookieKey]
}))

//link with passport
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoute')(app)





app.listen(PORT,()=>{
    console.log(`Ruuning on server ${PORT}`)
})