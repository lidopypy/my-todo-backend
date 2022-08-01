const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const googleUserSchema = new mongoose.Schema({
  _id: Schema.Types.ObjectId,

  todo: { type: Schema.Types.ObjectId, ref: "Todo" },

  googleID: { type: String, required: true, default: "" },

  username: { type: String, default: "" },

  email: { type: String, default: "" },

  // PFP
  thumbnail: { type: String, default: "user" },

  userType: { type: String, default: "googleUser" },

  create_time: { type: Date, default: Date.now },

  update_time: { type: Date, default: Date.now },
});

module.exports = mongoose.model("GoogleUser", googleUserSchema);
