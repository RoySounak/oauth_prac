const express = require('express')
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const FacebookStrategy = require('passport-facebook').Strategy
const keys = require('../config/keys')
const mongoose = require('mongoose')
const Client = mongoose.model("client")


passport.serializeUser((client,done)=>{
  done(null,client.id)
})

passport.deserializeUser((id,done)=>{
  Client.findById(id).then((client)=>{
    done(null,client)
  })
})


//google

passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: "/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    console.log("profile", profile)
    Client.findOne({generalId:profile.id}).then((existingClient)=>{
      if(existingClient){
        done(null,existingClient)
      }else{
        new Client({
          generalId:profile.id,
          name:profile.displayName,
          image:profile._json.picture,
          email:profile._json.email
          }).save().then((client)=>{
            done(null,client)
          })
      }
    })

  }
));




//facebook

passport.use(new FacebookStrategy({
  clientID: keys.facebookAppID,
  clientSecret: keys.facebookAppSecret,
  callbackURL: "/auth/facebook/callback"
},
function(accessToken, refreshToken, profile, cb) {
  console.log("profile", profile)
  Client.findOne({generalId:profile.id}).then((existingClient)=>{
    if(existingClient){
      done(null,existingClient)
    }else{
      new Client({
        generalId:profile.id,
        name:profile.displayName,
        image:profile._json.picture,
        email:profile._json.email
        }).save().then((client)=>{
          done(null,client)
        })
    }
  })

}
));