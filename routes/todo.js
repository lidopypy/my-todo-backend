const { Todo } = require("../model");
const mongoose = require("mongoose");
var ObjectId = require("mongoose").Types.ObjectId;
const User = require("../model/user");
const GoogleUser = require("../model/googleUser");
const Web3User = require("../model/web3user");
// const { registerValidation, loginValidation } = require("../utils");

//post("updateTodo", todo.updateTodo)
exports.updateTodo = async (req, res) => {
  const {
    _id,
    title,
    content,
    userId,
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

exports.deleteTodo = async (req, res) => {
  const { _id } = req.body;
  console.log("_id : ", _id);
  await Todo.deleteOne({ _id });
  res.status(200).send("Delete success!");
  console.log("This is deleteTodo routes.");
};

exports.fetchTodo = async (req, res) => {
  const { _id } = req.body;
  let populateId = "userId";
  Todo.find({ userId: _id })
    // .populate(populateId, ["_id"])
    // .populate(populateId)
    .exec(function (err, todos) {
      if (err) {
        console.log(err);
        return res.status(401);
      }
      // console.log("The todos are", todos);
      // console.log("todos : ", user.todo);
      // prints "The author is Ian Fleming"
      res.status(200).send({
        msg: "success",
        todos: todos,
      });
    });
};

exports.updateLocalTodos = async (req, res) => {
  // console.log("req.body : ", req.body);
  const { data, userId } = req.body;
  const newData = await Promise.all(
    data.map(async (todo) => {
      if (!mongoose.Types.ObjectId.isValid(todo._id)) {
        console.log("It's nano Id.");
        const newToDo = new Todo({
          ...todo,
          _id: new mongoose.Types.ObjectId(),
          userId,
        });
        const saveTodo = await newToDo.save();
        console.log("Save successed!");
        return saveTodo;
      } else {
        return todo;
      }
    })
  );
  // console.log("newData : ", newData);
  res.send(newData);
};
