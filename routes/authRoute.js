const express = require('express')
const passport = require('passport')
const app = express()  //invoke


module.exports = (app)=>{

    app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile','email'] }));


    app.get("/auth/google/callback",passport.authenticate('google'),(req,res)=>{
      res.redirect('/profile')
  });

    app.get('/api/current_user',(req,res)=>{
      res.send(req.user)
  })

    app.get('/profile',(req,res)=>{
    res.send("This is profile")
  })

    app.get('/api/logout',(req,res)=>{
    req.logout();
    res.send('profile')
  })


  app.get('/auth/facebook',
    passport.authenticate('facebook'));

  app.get('/auth/facebook/callback',
  passport.authenticate('facebook'),
  function(req, res) {
    res.redirect('/profile')
  });
}


