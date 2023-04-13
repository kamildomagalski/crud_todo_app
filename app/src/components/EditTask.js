import React from "react";
import AddTaskRow from "./AddTaskRow";

export default function EditTask({ field }) {
  return (
    <div className={"editTask"}>
      <div className={"rowContainer"}>
        <AddTaskRow />
      </div>
    </div>
  );
}
