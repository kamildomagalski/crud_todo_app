const express = require("express");
const toDoControllers = require("../controllers/toDoControllers");
const router = express.Router();

// @route GET - /todos/
router.route("/").get(toDoControllers.getAllToDos);

// @route POST - /todos/todo
router.route("/todo").post(toDoControllers.addToDo);

// @route GET && PUT && DELETE - /todos/todo/id
router
  .route("/todo/:id")
  .get(toDoControllers.getToDoById)
  .put(toDoControllers.updateToDoById)
  .delete(toDoControllers.deleteToDoById);
module.exports = router;
