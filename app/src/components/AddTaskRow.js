import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import LabelWrapper from "./LabelWrapper";
import Select from "./Select";
import { APIaddTask } from "../utils/apiQueries";

function AddTaskRow({ addTask }) {
  const [errors, setErrors] = useState({
    descriptionErrorMsg: "",
    priorityErrorMsg: "",
    dueDateErrorMsg: "",
  });

  const [newTask, setNewTask] = useState({
    id_todo: "",
    title: "",
    description: "",
    due_date: "",
    priority: "select...",
    done: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return console.log("Could not add new todo.");
    const newToDo = await APIaddTask(newTask);
    if (!newToDo) return;
    addTask(newToDo);
    clearErrors();
    clearNewTask();
  };
  const setTaskPriority = (value) => {
    setNewTask((prevState) => ({
      ...prevState,
      priority: value,
    }));
  };
  const setTask = (e) => {
    const { name, value } = e.target;
    let id_todo = uuidv4();
    setNewTask((prevState) => ({
      ...prevState,
      id_todo,
      [name]: value,
    }));
  };

  function validate() {
    let isValid = true;
    if (newTask.title.length < 5) {
      setErrors((prevState) => ({
        ...prevState,
        descriptionErrorMsg: "Title must contain at least 5 characters.",
      }));
      isValid = false;
    }
    if (newTask.priority === "select...") {
      setErrors((prevState) => ({
        ...prevState,
        priorityErrorMsg: "You have to set priority.",
      }));
      isValid = false;
    }
    if (newTask.due_date === "") {
      setErrors((prevState) => ({
        ...prevState,
        dueDateErrorMsg: "You have to set due date.",
      }));
      isValid = false;
    }
    return isValid;
  }

  function clearErrors() {
    setErrors({
      descriptionErrorMsg: "",
      priorityErrorMsg: "",
      dueDateErrorMsg: "",
    });
  }

  function clearNewTask() {
    setNewTask({
      id_todo: "",
      title: "",
      description: "",
      due_date: "",
      priority: "select...",
      done: false,
    });
  }

  // is it bug: double validation??
  function shouldHideDescriptionMsgOff() {
    return newTask.title.length < 5;
  }

  function shouldHidePriorityMsgOff() {
    return newTask.priority === "select...";
  }
  function shouldHideDueDateMsgOff() {
    return newTask.due_date === "";
  }

  return (
    <div className={"addTaskRow"}>
      <form className={"addTaskRow__form"} onSubmit={handleSubmit}>
        <div className={"wrapper"}>
          <label className={"addTaskRow__label"}>
            <p className={"addTaskRow__text"}>Taks title:</p>
            <input
              value={newTask.title}
              name={"title"}
              onChange={setTask}
              type={"text"}
              placeholder={"Enter task title"}
              className={"addTaskRow__input addTaskRow__input-text"}
            />
          </label>
          <label className={"addTaskRow__label"}>
            <p className={"addTaskRow__text"}>Taks description:</p>
            <input
              value={newTask.description}
              name={"description"}
              onChange={setTask}
              type={"text"}
              placeholder={"Enter task description"}
              className={"addTaskRow__input addTaskRow__input-text"}
            />
          </label>
        </div>
        <div className={"wrapper"}>
          <LabelWrapper title={"Priority"}>
            <Select
              title={"Priority"}
              options={["Low", "Medium", "High"]}
              selectValue={newTask.priority}
              changeHandler={setTaskPriority}
              className={"selectAddTask"}
            />
          </LabelWrapper>
          <LabelWrapper title={"Due date"}>
            <input
              value={newTask.due_date}
              name={"due_date"}
              onChange={setTask}
              type={"datetime-local"}
              className={"addTaskRow__input addTaskRow__input-date"}
            />
          </LabelWrapper>
        </div>
        <button type={"submit"} className={"addTaskRow__btn"}>
          Add task
        </button>
      </form>
      <p
        className={
          shouldHideDescriptionMsgOff() ? "addTaskRow__error" : "d-none"
        }
      >
        {errors.descriptionErrorMsg}
      </p>
      <p className={shouldHideDueDateMsgOff() ? "addTaskRow__error" : "d-none"}>
        {errors.dueDateErrorMsg}
      </p>
      <p
        className={shouldHidePriorityMsgOff() ? "addTaskRow__error" : "d-none"}
      >
        {errors.priorityErrorMsg}
      </p>
    </div>
  );
}

export default AddTaskRow;
