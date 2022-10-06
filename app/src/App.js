import React from "react";
import ToDoApp from "./components/ToDoApp";
import { ProvideAuth } from "./auth/ProvideAuth";

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
    <React.StrictMode>
      <ProvideAuth>
        <ToDoApp />
      </ProvideAuth>
    </React.StrictMode>
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
