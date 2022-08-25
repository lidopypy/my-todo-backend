const passport = require("passport");
const mongoose = require("mongoose");

// const jwt = require("jsonwebtoken");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const Web3Strategy = require("passport-web3");
const User = require("../model/user");
const MyToDoWeb_URL = require("../app.config").MyToDoWeb_URL;

// const GoogleUser = require("../model/googleUser");
// const Web3User = require("../model/web3user");
// const LocalStrategy = require("passport-local");
// const bcrypt = require("bcrypt");

let opts = {};
// opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
opts.jwtFromRequest = ExtractJwt.fromBodyField("jwt");
opts.secretOrKey = process.env.PASSPORT_SECRET;

passport.use(
  new JwtStrategy(opts, function (jwt_payload, done) {
    // console.log("jwt_payload : ", jwt_payload);
    User.findOne({ _id: jwt_payload._id }, (err, user) => {
      if (err) {
        return done(err, false);
      }
      if (user) {
        done(null, user);
      } else {
        done(null, false);
      }
    });
  })
);

//google use passport-google-oauth20
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: MyToDoWeb_URL + "/google/redirect",
    },
    //passport verify callback
    (accessToken, refreshToken, profile, done) => {
      // console.log(profile);
      //find or create new user.
      User.findOne({ googleID: profile.id }).then((foundUser) => {
        if (foundUser) {
          console.log("User already exist");
          // console.log("foundUser: ", foundUser);
          done(null, foundUser);
        } else {
          new User({
            _id: new mongoose.Types.ObjectId(),
            username: profile.displayName,
            googleID: profile.id,
            thumbnail: profile.photos[0].value,
            email: profile.emails[0].value,
            userType: "googleUser",
          })
            .save()
            .then((newUser) => {
              // console.log("newUser: ", newUser);
              done(null, newUser);
            });
        }
      });
    }
  )
);

//Web3.0 use passport-web3
const onAuth = (address, done) => {
  console.log("OnAuth address: ", address);
  // optional additional validation. To deny auth:
  // done(new Error('User is not authorized.'));
  // Web3User.findOne({ address }, (err, user) => done(err, user));
};
const web3Strategy = new Web3Strategy(onAuth);
passport.use(web3Strategy);

passport.serializeUser(function (user, done) {
  console.log("I should have jack ");
  done(null, user);
});
passport.deserializeUser(function (obj, done) {
  console.log("I wont have jack shit");
  done(null, obj);
});
