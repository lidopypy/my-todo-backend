const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  _id: Schema.Types.ObjectId,

  username: {
    type: String,
    required: function () {
      return this.userType !== "web3User";
    },
    minLength: 3,
    maxLength: 50,
  },

  googleID: {
    type: String,
    required: function () {
      return this.userType === "googleUser";
    },
    default: "",
  },

  thumbnail: {
    type: String,
    required: function () {
      return this.userType === "googleUser";
    },
    default: "user",
  },

  email: {
    type: String,
    required: function () {
      return this.userType !== "web3User";
    },
    minLength: 6,
    maxLength: 100,
  },

  address: {
    type: String,
    required: function () {
      return this.userType === "web3User";
    },
    minLength: 6,
    maxLength: 100,
    default: null,
  },

  password: {
    type: String,
    required: function () {
      return this.userType === "normalUser";
    },
    minLength: 6,
    maxLength: 1024,
  },

  todo: { type: Schema.Types.ObjectId, ref: "Todo" },

  userType: {
    type: String,
    enum: ["googleUser", "normalUser", "web3User"],
    required: true,
  },

  create_time: { type: Date, default: Date.now },

  update_time: { type: Date, default: Date.now },
});

//Mongoose schema pre middleware
//Check users password is modified before save new user.
userSchema.pre("save", async function (next) {
  console.log("this ; ", this.userType);
  if (
    (this.userType === "normalUser") &
    (this.isModified("password") || this.isNew)
  ) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
  } else {
    return next();
  }
});

//mongoose Instance function, used to comfirm password correct by bcrypt.
//this.password is hashed password is mongoDB.
userSchema.methods.comparePassword = function (password, callBack) {
  bcrypt.compare(password, this.password, (err, isMatch) => {
    if (err) {
      return callBack(err, isMatch);
    }
    callBack(null, isMatch);
  });
};

module.exports = mongoose.model("User", userSchema);
