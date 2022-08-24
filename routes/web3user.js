const { User } = require("../model");
const mongoose = require("mongoose");
var sigUtil = require("eth-sig-util");
const jwt = require("jsonwebtoken");

exports.web3Login = async (req, res) => {
  try {
    const { address, data, sig } = req.body;
    const msgParams = { data, sig };
    //check the validation of data.
    const recovered = await sigUtil.recoverPersonalSignature(msgParams);
    if (recovered === address) {
      // check if the user exists.
      const web3User = await User.findOne({ address });
      if (web3User) {
        console.log("web3User : ", web3User);
        const tokenObject = {
          _id: web3User._id,
          address: web3User.address,
          userType: web3User.userType,
        };
        const token = jwt.sign(tokenObject, process.env.PASSPORT_SECRET, {
          expiresIn: "24h",
        });
        res.send({ token, user: web3User });
      }
      // register the user
      else {
        const newUser = new User({
          _id: new mongoose.Types.ObjectId(),
          address,
          userType: "web3User",
        });
        const web3User = await newUser.save();
        const tokenObject = {
          _id: web3User._id,
          address: web3User.address,
          userType: web3User.userType,
        };
        const token = jwt.sign(tokenObject, process.env.PASSPORT_SECRET, {
          expiresIn: "24h",
        });
        res.send({ token, user: web3User });
      }
    } else {
      res.send("verified fail.");
    }
  } catch (err) {
    console.log(err);
    res.send("verified fail.");
  }
};

// exports.register = (req, res) => {};

// exports.logout = (req, res) => {};

// exports.loginAdmin = (req, res) => {};

// exports.getUser = (req, res) => {};
