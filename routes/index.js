/*
 *All routes API
 */
const web3user = require("./web3user");
const user = require("./user");
const googleUser = require("./googleUser");
const todo = require("./todo");

const passport = require("passport");

module.exports = (app) => {
  app.get("/", (req, res) => {
    res.send("Home.");
  });

  //user routes
  app.post("/login", user.login);
  app.post("/register", user.register);

  //google user routes
  app.get("/google", googleUser.googleLogin);
  app.get("/google/redirect", googleUser.googlePass, googleUser.googleRedirect);

  //web3 user routes
  // app.post("/web3UserRegister", web3user.register);
  app.post("/web3UserLogin", web3user.web3Login);

  //post todo list
  app.post(
    "/updateTodo",
    passport.authenticate("jwt", { session: false }),
    todo.updateTodo
  );
  app.post(
    "/deleteTodo",
    passport.authenticate("jwt", { session: false }),
    todo.deleteTodo
  );
  app.post(
    "/fetchTodo",
    passport.authenticate("jwt", { session: false }),
    todo.fetchTodo
  );
  app.post(
    "/updateLocalTodos",
    passport.authenticate("jwt", { session: false }),
    todo.updateLocalTodos
  );
};
