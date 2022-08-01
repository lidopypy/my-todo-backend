const express = require("express");
const app = express();
//use cors.js to enable CORS with various options.
const cors = require("cors");
app.use(cors());
//use dotemv to stored secret data.
const dotenv = require("dotenv");
dotenv.config();
//use passport strategy.
const passport = require("passport");
const session = require("express-session");
const flash = require("connect-flash");

// mongoDB.connect();
require("./core/mongodb");

//passport init.
require("./core/passport");

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

//import routes
const route = require("./routes/index");

//route init.
route(app);

//error handler
app.use((err, req, res, next) => {
  console.log("err:", err);
  res.status(500).send("something went wrong");
});

app.listen(8080, () => {
  console.log("Server running on port 8080.");
});
