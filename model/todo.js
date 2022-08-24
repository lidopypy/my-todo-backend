const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// const newTodo = {
//   check: false,
//   checkDone: false,
//   confirmDone: false,
// };

const todoSchema = new mongoose.Schema({
  _id: Schema.Types.ObjectId,

  title: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 50,
    required: true,
  },

  content: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 500,
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  // googleUserId: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "GoogleUser",
  // },

  // web3UserId: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "Web3User",
  // },

  check: {
    type: Boolean,
    default: false,
  },
  checkDone: {
    type: Boolean,
    default: false,
  },
  confirmDone: {
    type: Boolean,
    default: false,
  },
  setTime: {
    type: String,
    default: undefined,
  },

  doneTime: {
    type: String,
    default: undefined,
  },
});

module.exports = mongoose.model("Todo", todoSchema);
