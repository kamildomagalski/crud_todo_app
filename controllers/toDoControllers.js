const ToDo = require("../models/ToDo");

exports.getAllToDos = async (req, res, next) => {
  try {
    const [todos, _] = await ToDo.findAll();
    console.log(todos);
    res.status(200).send({ todos });
  } catch (err) {
    console.log(err);
  }
};

exports.addToDo = async (req, res, next) => {
  const { title, description, due_date, priority } = req.body.todo;
  if (!title) {
    res.status(418).send({ message: "We need a todo!!" });
  }
  try {
    let toDo = new ToDo(title, description, due_date, priority);

    const [ResultSetHeader] = await toDo.save();
    const [newToDo, _] = await ToDo.findById(ResultSetHeader.insertId);

    console.log(newToDo);
    res.status(201).send({ newToDo: newToDo[0] });
  } catch (err) {
    console.log(err);
  }
};

exports.getToDoById = async (req, res, next) => {
  const id = req.params.id;
  try {
    const [toDo, _] = await ToDo.findToDo(id);

    console.log(toDo);
    res.status(200).send({ toDo: toDo[0] });
  } catch (err) {
    console.log(err);
  }
};

exports.deleteToDoById = async (req, res, next) => {
  const id = req.params.id;
  try {
    const [ResultSetHeader] = await ToDo.delete(id);
    const isToDoDeleted = ResultSetHeader.affectedRows;
    if (!isToDoDeleted) {
      console.log("Delete failed, no toDo found.");
      return res
        .status(200)
        .send({ message: `It looks like there is no toDo with id = ${id}` });
    }
    console.log("Delete, affected rows: " + ResultSetHeader.affectedRows);
    res.status(200).send({ message: "ToDo successfully deleted!" });
  } catch (err) {
    console.log(err);
  }
};

exports.updateToDoById = async (req, res, next) => {
  const id = req.params.id;
  const { title, description, due_date, priority } = req.body.todo;
  if (!title) {
    res.status(418).send({ message: "We need a todo!!" });
  }
  try {
    const [ResultSetHeader, _] = await ToDo.update(
      id,
      title,
      description,
      due_date,
      priority
    );
    console.log(ResultSetHeader);
    res.status(200).send(`Succesfully update todo: "${title}"`);
  } catch (err) {
    console.log(err);
  }
};
