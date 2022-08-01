const { Todo } = require("../model");
const mongoose = require("mongoose");
const User = require("../model/user");
const GoogleUser = require("../model/googleUser");
const Web3User = require("../model/web3user");
const todo = require("../model/todo");
// const { registerValidation, loginValidation } = require("../utils");

//post("updateTodo", todo.updateTodo)
exports.updateTodo = async (req, res) => {
  const {
    _id,
    title,
    content,
    userId,
    googleUserId,
    web3UserId,
    check,
    checkDone,
    confirmDone,
    setTime,
    doneTime,
  } = req.body;
  console.log("req.body : ", req.body);
  const update = {
    title,
    content,
    userId,
    googleUserId,
    web3UserId,
    check,
    checkDone,
    confirmDone,
    setTime,
    doneTime,
  };
  //Check Todo exist.
  const ToDoExist = await Todo.findOneAndUpdate({ _id }, update, {
    new: true,
  });
  //Todo not exist, save todo.
  if (!ToDoExist) {
    const newToDo = new Todo({
      _id: new mongoose.Types.ObjectId(),
      title,
      content,
      userId,
      googleUserId,
      web3UserId,
      check,
      checkDone,
      confirmDone,
      setTime,
      doneTime,
    });
    try {
      const savedTodo = await newToDo.save();
      res.status(200).send({
        msg: "success",
        savedObject: savedTodo,
      });
    } catch (err) {
      console.log(err);
      res.status(400).send("User not saved.");
    }
  } else {
    res.status(200).send({
      msg: "success",
      savedObject: ToDoExist,
    });
  }
  console.log(req.body);
  console.log("This is updateTodo routes.");
  // res.send("This is updateTodo routes.");
};

exports.fetchTodo = async (req, res) => {
  const { userType, _id } = req.body;
  let Usermodel;
  let userId;
  let populateId;
  switch (userType) {
    case "googleUser":
      Usermodel = "GoogleUser";
      userId = { googleUserId: _id };
      populateId = "googleUserId";
      console.log("Usermodel : ", Usermodel);
      break;
    case "normalUser":
      Usermodel = "User";
      userId = { userId: _id };
      populateId = "userId";
      console.log("Usermodel : ", Usermodel);

      break;
    case "web3User":
      Usermodel = "Web3User";
      userId = { web3UserId: _id };
      populateId = "web3UserId";
      console.log("Usermodel : ", Usermodel);
      console.log("userId : ", userId);

      break;
    default:
      break;
  }
  Todo.find(userId)
    .populate(populateId, ["_id"])
    .exec(function (err, todos) {
      if (err) {
        return res.status(401);
      }
      console.log("The todos are", todos);
      // console.log("todos : ", user.todo);
      // prints "The author is Ian Fleming"
      res.status(200).send({
        msg: "success",
        todos: todos,
      });
    });
};

exports.updateLocalTodos = async (req, res) => {
  const { todos, userId, googleUserId, web3UserId } = req.body;
  console.log("todos : ", JSON.parse(todos));
  console.log("todos.length : ", todos.length);
};
