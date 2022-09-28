import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function HeaderRow({ sorting, sortByDescription, sortByPriority, sortByDone }) {
  const handleSortDescription = () => {
    if (
      sorting.description === "descending" ||
      sorting.description === undefined
    ) {
      sortByDescription("ascending");
    } else {
      sortByDescription("descending");
    }
  };

  const handleSortPriority = () => {
    if (sorting.priority === "descending" || sorting.priority === undefined) {
      sortByPriority("ascending");
    } else {
      sortByPriority("descending");
    }
  };

  const handleSortDone = () => {
    if (sorting.done === "descending" || sorting.done === undefined) {
      sortByDone("ascending");
    } else {
      sortByDone("descending");
    }
  };

  const sortIcon = (sortingKey) => {
    if (sorting[`${sortingKey}`] === "ascending") {
      return <FontAwesomeIcon icon={"sort-up"} className={"headerRow__icon"} />;
    } else if (sorting[`${sortingKey}`] === "descending") {
      return (
        <FontAwesomeIcon icon={"sort-down"} className={"headerRow__icon"} />
      );
    }
    return (
      <FontAwesomeIcon
        icon={"sort"}
        className={"headerRow__icon headerRow__icon-dim"}
      />
    );
  };
  return (
    <div className={"headerRow"}>
      <p
        className={"headerRow__title headerRow__title-taskName"}
        onClick={handleSortDescription}
      >
        Task name <span>{sortIcon("description")}</span>
      </p>
      <div className={"headerRow__wrapper"}>
        <p
          className={"headerRow__title headerRow__title-priority"}
          onClick={handleSortPriority}
        >
          Priority {sortIcon("priority")}
        </p>
        <p
          className={"headerRow__title headerRow__title-done"}
          onClick={handleSortDone}
        >
          Done {sortIcon("done")}
        </p>
      </div>
    </div>
  );
}

export default HeaderRow;
