const passport = require("passport");
const jwt = require("jsonwebtoken");
const MyToDoWeb_URL = require("../app.config").MyToDoWeb_URL;

exports.googleLogin = passport.authenticate("google", {
  scope: ["profile", "email"],
});

exports.googlePass = passport.authenticate("google");

exports.googleRedirect = (req, res) => {
  console.log("redirected");
  const tokenObject = {
    _id: req.user._id,
    email: req.user.email,
    userType: req.user.userType,
  };
  console.log("tokenObject : ", tokenObject);
  const token = jwt.sign(tokenObject, process.env.PASSPORT_SECRET);
  console.log(MyToDoWeb_URL);
  var jsonValue = JSON.stringify({
    jwt: token,
    user: req.user,
  });
  res.cookie("cookies", jsonValue);
  res.redirect(MyToDoWeb_URL);

  // const tokenObject = { _id: user._id, email: user.email };
  // const token = jwt.sign(tokenObject, process.env.PASSPORT_SECRET);
  // res.send({ success: true, token: token, user });
  // if (req.session.returnTo) {
  //   let newPath = req.session.returnTo;
  //   req.session.returnTo = "";
  //   res.redirect(newPath);
  // } else {
  //   res.redirect("/");
  // }
};
