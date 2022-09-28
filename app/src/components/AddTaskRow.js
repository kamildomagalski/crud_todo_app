import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Select from "./Select";

function AddTaskRow({ addTask }) {
  const [errors, setErrors] = useState({
    descriptionErrorMsg: "",
    priorityErrorMsg: "",
  });

  const [newTask, setNewTask] = useState({
    id: "",
    description: "",
    priority: "select...",
    done: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    addTask(newTask);
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
    let id = uuidv4();
    setNewTask((prevState) => ({
      ...prevState,
      id,
      [name]: value,
    }));
  };

  function validate() {
    let isValid = true;
    if (newTask.description.length < 5) {
      setErrors((prevState) => ({
        ...prevState,
        descriptionErrorMsg: "Description must contain at least 5 characters.",
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
    return isValid;
  }

  console.log(errors);

  function clearErrors() {
    setErrors({
      descriptionErrorMsg: "",
      priorityErrorMsg: "",
    });
  }

  function clearNewTask() {
    setNewTask({
      id: "",
      description: "",
      priority: "select...",
      done: false,
    });
  }

  // is it bug: double validation??
  function shouldHideDescriptionMsgOff() {
    return newTask.description.length < 5;
  }

  function shouldHidePriorityMsgOff() {
    return newTask.priority === "select...";
  }

  return (
    <div className={"addTaskRow"}>
      <form className={"addTaskRow__form"} onSubmit={handleSubmit}>
        <input
          value={newTask.description}
          name={"description"}
          onChange={setTask}
          type={"text"}
          placeholder={"Enter task description"}
          className={"addTaskRow__input addTaskRow__input-text"}
        />
        <div className={"wrapper"}>
          <p className={"addTaskRow__text"}>Priority:</p>
          <Select
            options={["Low", "Medium", "High"]}
            selectValue={newTask.priority}
            changeHandler={setTaskPriority}
            className={'selectAddTask'}
          />
          <button type={"submit"} className={"addTaskRow__btn"}>
            Add task
          </button>
        </div>
      </form>
      <p
        className={
          shouldHideDescriptionMsgOff() ? "addTaskRow__error" : "d-none"
        }
      >
        {errors.descriptionErrorMsg}
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
