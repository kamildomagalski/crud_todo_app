import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";

import TaskRow from "../components/TaskRow";
import HeaderRow from "../components/HeaderRow";
import AddTaskRow from "../components/AddTaskRow";
import PaginationRow from "../components/PaginationRow";
import RowContainer from "../components/RowContainer";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

import { sortByEnumProperty, sortByProperty } from "../functions/utilities";

import { APIdeleteTask, APIgetAllToDos } from "../api/apiQueries";
import useAuth from "../auth/useAuth";

export default function ToDo() {
  const [tasks, setTasks] = useState([]);
  const [sorting, setSorting] = useState(
    JSON.parse(localStorage.getItem("sorting")) || {}
  );
  //pagination states
  const [tasksPerPage, setTasksPerPage] = useState(
    JSON.parse(localStorage.getItem("tasksPerPage")) || 5
  );
  const [currentPage, setCurrentPage] = useState(1);

  const axiosPrivate = useAxiosPrivate();
  const history = useHistory();
  const location = useLocation();
  const { setAuth } = useAuth();
  //Pagination
  const maxTaskIndex = currentPage * tasksPerPage;
  const minTaskIndex = maxTaskIndex - tasksPerPage;
  const currentTasks = tasks.slice(minTaskIndex, maxTaskIndex);
  const numberOfPages = Math.ceil(tasks.length / tasksPerPage);

  //set page to last when deleting last task
  if (currentPage > numberOfPages && tasks.length > 0)
    setCurrentPage(numberOfPages);
  //set page to first after changing taskPerPage
  useEffect(() => {
    setCurrentPage(1);
  }, [tasksPerPage]);

  useEffect(() => {
    const handleGetData = async () => {
      try {
        const newToDos = await APIgetAllToDos(axiosPrivate);
        if (newToDos) setTasks(newToDos);
      } catch (err) {
        console.log(err);
        setAuth({});
        history.push("/login", { from: location });
      }
    };

    handleGetData();
  }, [axiosPrivate, location, history, setAuth]);

  useEffect(() => {
    localStorage.setItem("tasksPerPage", JSON.stringify(tasksPerPage));
    localStorage.setItem("sorting", JSON.stringify(sorting));
  }, [tasksPerPage, sorting]);

  const changeNumberOfRows = (value) => {
    setTasksPerPage(value);
  };
  const setDone = (id) => {
    setTasks(
      tasks.map((item) => {
        if (item.id_todo === id) {
          return {
            ...item,
            done: !item.done,
          };
        }
        return item;
      })
    );
  };

  const addTask = (newTask) => {
    setTasks((prevState) => [...prevState, newTask]);
  };

  const deleteTask = async (id) => {
    const deleted = await APIdeleteTask(axiosPrivate, id);
    if (!deleted) return;
    setTasks(tasks.filter((item) => item.id_todo !== id));
  };

  const editTask = (taskId) => {
    alert("edit task");
  };

  const setPage = (number) => {
    setCurrentPage(number);
  };

  function sortByDescription(order) {
    if (order === "ascending") {
      setTasks(sortByProperty("ascending", tasks, "description"));
    } else {
      setTasks(sortByProperty("descending", tasks, "description"));
    }
    setSorting({
      description: order,
    });
  }

  function sortByPriority(order) {
    if (order === "ascending") {
      setTasks(
        sortByEnumProperty(
          ["High", "Medium", "Low"],
          "ascending",
          tasks,
          "priority"
        )
      );
    } else {
      setTasks(
        sortByEnumProperty(
          ["High", "Medium", "Low"],
          "descending",
          tasks,
          "priority"
        )
      );
    }
    setSorting({
      priority: order,
    });
  }

  function sortByDone(order) {
    if (order === "ascending") {
      setTasks(sortByEnumProperty([true, false], "ascending", tasks, "done"));
    } else {
      setTasks(sortByEnumProperty([true, false], "descending", tasks, "done"));
    }
    setSorting({
      done: order,
    });
  }

  return (
    <>
      <RowContainer>
        <AddTaskRow addTask={addTask} />
      </RowContainer>
      <RowContainer>
        <HeaderRow
          sortByDescription={sortByDescription}
          sortByPriority={sortByPriority}
          sortByDone={sortByDone}
          sorting={sorting}
        />
        {currentTasks.map((task) => {
          return (
            <TaskRow
              key={task.id_todo}
              task={task}
              setDone={setDone}
              deleteTask={deleteTask}
            />
          );
        })}
        <PaginationRow
          tasksPerPage={tasksPerPage}
          changeNumberOfRows={changeNumberOfRows}
          numberOfPages={numberOfPages}
          numberOfTasks={tasks.length}
          minTaskIndex={minTaskIndex}
          maxTaskIndex={maxTaskIndex}
          currentPage={currentPage}
          setPage={setPage}
        />
      </RowContainer>
    </>
  );
}
