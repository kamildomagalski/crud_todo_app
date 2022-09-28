import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function TaskRow({ task, setDone, deleteTask }) {
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
      <p className={"taskRow__text taskRow__text-taskName"}>
        {task.description}
      </p>
      <div className={"taskRow__wrapper"}>
        <p className={"taskRow__text taskRow__text-priority"}>
          {task.priority}
        </p>
        <span
          onClick={() => setDone(task.id)}
          className={"taskRow__checkboxWrapper"}
        >
          {isCheckedIconVisible()}
        </span>
        <div className={"taskRow__btnWrapper"}>
          <FontAwesomeIcon
            icon={"trash"}
            className={"taskRow__deleteBtn"}
            onClick={() => deleteTask(task.id)}
          />
        </div>
      </div>
    </div>
  );
}

export default TaskRow;
