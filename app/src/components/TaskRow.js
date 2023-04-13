import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { stripToMinutes } from "../utils/helpers";
import EditTask from "./EditTask";

function TaskRow({ task, setDone, deleteTask }) {
  const [isEditTaskOpen, setIsEditTaskOpen] = useState(false);

  const openEditTask = () => {
    setIsEditTaskOpen((prevState) => !prevState);
  };
  //turn off error notification when changing inputs
  const isCheckedIconVisible = () => {
    if (task.done === true) {
      return (
        <span className={" taskRow__checkbox taskRow__checkbox-done"}>
          <FontAwesomeIcon icon={"check"} className={"taskRow__checkIcon"} />
        </span>
      );
    } else {
      return <span className={"taskRow__checkbox"} />;
    }
  };

  return (
    <div className={"taskRow"}>
      <div className={"taskRow__mainWrapper"}>
        <div className={"taskRow__titleWrapper"}>
          <p className={"taskRow__text taskRow__text-taskName"}>
            Title: {task.title}
          </p>
          <p className={"taskRow__text taskRow__text-dueDate"}>
            Due date: {stripToMinutes(task.due_date) || "n/a"}
          </p>
        </div>
        <p className={"taskRow__text taskRow__text-description"}>
          Description:
        </p>
        <p className={"taskRow__text"}>{task.description}</p>
      </div>
      <div className={"taskRow__wrapper"}>
        <p className={"taskRow__text taskRow__text-priority"}>
          {task.priority}
        </p>
        <span
          onClick={() => setDone(task.id_todo)}
          className={"taskRow__checkboxWrapper"}
        >
          {isCheckedIconVisible()}
        </span>
        <div className={"taskRow__btnWrapper"}>
          <FontAwesomeIcon
            icon={"pen-square"}
            className={"taskRow__editBtn"}
            onClick={openEditTask}
          />
          <FontAwesomeIcon
            icon={"trash"}
            className={"taskRow__deleteBtn"}
            onClick={() => deleteTask(task.id_todo)}
          />
        </div>
      </div>
      {isEditTaskOpen && <EditTask />}
    </div>
  );
}

export default TaskRow;
