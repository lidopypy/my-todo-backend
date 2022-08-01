const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const web3UserSchema = new mongoose.Schema({
  _id: Schema.Types.ObjectId,

  address: {
    type: String,
    required: false,
    minLength: 6,
    maxLength: 100,
    default: null,
  },

  todo: { type: Schema.Types.ObjectId, ref: "Todo" },

  userType: { type: String, default: "web3User" },

  create_time: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Web3User", web3UserSchema);
