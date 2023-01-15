import axios from "./axios";

export const APIRegister = async (newUser) => {
  try {
    const response = await axios.post("/register", { newUser });
    if (response) {
      return response.data.message;
    } else {
      console.log(response.data.message);
    }
  } catch (err) {
    console.log(err);
  }
};

export const APILogIn = async (credentials) => {
  try {
    const response = await axios.post(
      "/login",
      { credentials },
      { withCredentials: true }
    );
    if (response.status === 200) {
      console.log(response.data.message);
      return response.data;
    } else if (response.status === 204) {
      console.log("False credentials or no user in db");
      return "False credentials or no user in database";
    } else {
      console.log("Could not authorizate on backend");
      return response.data.message;
    }
  } catch (err) {
    console.log(err);
  }
};

export const APILogOut = async () => {
  try {
    const response = await axios.get("/logout", { withCredentials: true });
    if (response.status === 200) {
      console.log(response.data.message);
      return response.data.message;
    } else {
      console.log(response.data.message);
      return false;
    }
  } catch (err) {
    console.log(err);
  }
};

export const APIRefreshToken = async () => {
  const response = await axios.get("/refresh-token", {
    withCredentials: true,
  });

  if ((response.status = 200)) {
    const { login, role, newAccessToken } = response.data;
    return { login, role, newAccessToken };
  } else {
    console.log("Could not get new token");
  }
};

export const APIgetAllToDos = async (axios) => {
  const response = await axios.get("/todos");
  if (response.status === 200) {
    return response.data.todos;
  } else {
    console.log("Fetching gone wrong!");
    return [];
  }
};

export const APIaddTask = async (axios, todo) => {
  const response = await axios.post("/todos/todo", { todo });
  if ((response.status = 200)) {
    return response.data.newToDo;
  } else {
    return false;
  }
};

export const APIdeleteTask = async (axios, id) => {
  const response = await axios.delete(`/todos/todo/${id}`);
  if (response.status === 200) {
    console.log(response.data.message);
    return true;
  } else {
    return false;
  }
};
