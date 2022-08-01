const { User } = require("../model");
const mongoose = require("mongoose");
const { registerValidation, loginValidation } = require("../utils");
const jwt = require("jsonwebtoken");

//post("/register", user.register);
exports.register = async (req, res) => {
  const { username, email, password } = req.body;

  //check the validation of data
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // check if the user exists
  const emailExist = await User.findOne({ email });
  if (emailExist)
    return res.status(400).send("Email has already been registered.");

  // register the user
  const newUser = new User({
    _id: new mongoose.Types.ObjectId(),
    email,
    username,
    password,
  });
  try {
    const savedUser = await newUser.save();
    res.status(200).send({
      msg: "success",
      savedObject: savedUser,
    });
  } catch (err) {
    console.log(err);
    res.status(400).send("User not saved.");
  }
};

//post("/login", user.login);
exports.login = (req, res) => {
  const { email, password } = req.body;
  // check the validation of data by "joi"
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  User.findOne({ email }, function (err, user) {
    if (err) {
      res.status(400).send(err);
    }
    if (!user) {
      res.status(401).send("User not found.");
    } else {
      console.log("user.todo: ", user.todo);
      //Use schema userinstance method function. (In user-models)
      user.comparePassword(password, function (err, isMatch) {
        if (err) return res.status(400).send(err);
        if (isMatch) {
          const tokenObject = {
            _id: user._id,
            email: user.email,
            userType: user.userType,
          };
          const token = jwt.sign(tokenObject, process.env.PASSPORT_SECRET);
          res.send({ success: true, token: token, user });
        } else {
          res.status(401).send("Wrong password.");
        }
      });
    }
  });
};
