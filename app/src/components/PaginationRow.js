import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Select from "./Select";

function PaginationRow({
  tasksPerPage,
  changeNumberOfRows,
  minTaskIndex,
  maxTaskIndex,
  numberOfPages,
  numberOfTasks,
  currentPage,
  setPage,
}) {
  // const handleNumberOfRowsChange = (e) => {
  //   changeNumberOfRows(e.target.value);
  // };

  //logic for printing correct pagination data depending on number of tasks
  function visibleRange() {
    if (minTaskIndex === 0 && numberOfTasks === 0) {
      return `${minTaskIndex} - ${numberOfTasks} of ${numberOfTasks}`;
    } else if (minTaskIndex === 0 && maxTaskIndex <= numberOfTasks) {
      return `${minTaskIndex + 1} - ${maxTaskIndex} of ${numberOfTasks}`;
    } else if (minTaskIndex === 0 && maxTaskIndex > numberOfTasks) {
      return `${minTaskIndex + 1} - ${numberOfTasks} of ${numberOfTasks}`;
    } else if (minTaskIndex !== 0 && maxTaskIndex > numberOfTasks) {
      return `${minTaskIndex + 1} - ${numberOfTasks} of ${numberOfTasks}`;
    } else if (minTaskIndex !== 0 && maxTaskIndex <= numberOfTasks) {
      return `${minTaskIndex + 1} - ${maxTaskIndex} of ${numberOfTasks}`;
    }
  }

  return (
    <div className={"paginationRow"}>
      <p className={"paginationRow__text"}>Rows per page:</p>
      <Select options={[5, 10, 15]} selectValue={tasksPerPage} changeHandler={changeNumberOfRows} className={'selectPagination'}/>
      <p className={"paginationRow__text"}>{visibleRange()}</p>
      <button
        className={"paginationRow__btn"}
        onClick={() => setPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <FontAwesomeIcon
          icon={"chevron-left"}
          className={"paginationRow__icon"}
        />
      </button>
      <button
        className={"paginationRow__btn"}
        onClick={() => setPage(currentPage + 1)}
        disabled={currentPage === numberOfPages || numberOfTasks === 0}
      >
        <FontAwesomeIcon
          icon={"chevron-right"}
          className={"paginationRow__icon"}
        />
      </button>
    </div>
  );
}

export default PaginationRow;
