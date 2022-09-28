import React from "react";
import ToDoApp from "./components/ToDoApp";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faSort,
  faSortUp,
  faSortDown,
  faTrash,
  faCheck,
  faChevronRight,
  faChevronLeft,
  faChevronUp,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";

function App() {
  return (
    <>
      <ToDoApp />
    </>
  );
}

export default App;
library.add(
  faSort,
  faSortUp,
  faSortDown,
  faTrash,
  faCheck,
  faChevronRight,
  faChevronLeft,
  faChevronUp,
  faChevronDown
);
