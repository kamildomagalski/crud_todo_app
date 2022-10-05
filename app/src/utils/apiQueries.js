const baseUrl = "http://localhost:8080";

const headers = {
  "content-type": "application/json",
};

export const APIRegister = async (newUser) => {
  try {
    const response = await fetch(`${baseUrl}/register`, {
      method: "POST",
      headers,
      body: JSON.stringify({ newUser }),
    });
    if (response.ok) {
      const data = await response.json();
      return data.message;
    } else {
      const data = await response.json();
      console.log(data.message);
    }
  } catch (err) {
    console.log(err);
  }
};

export const APILogIn = async (credentials) => {
  try {
    const response = await fetch(`${baseUrl}/login`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ credentials }),
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      return data;
    } else {
      const data = await response.json();
      console.log("Could not authorizate on backend");
      return data.message;
    }
  } catch (err) {
    console.log(err);
  }
};

export const APILogOut = async () => {
  const refreshToken = "";
  try {
    const response = await fetch(`${baseUrl}/logout`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ refreshToken }),
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      return data;
    } else {
      const data = await response.json();
      console.log(data.message);
    }
  } catch (err) {
    console.log(err);
  }
};

export const APIRefreshToken = async (refreshToken) => {
  const response = await fetch(`${baseUrl}/refresh-token`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ refreshToken }),
  });

  if (response.ok) {
    const data = await response.json();
    return data.newToken;
  } else {
    console.log("Sth is wrong");
  }
};

export const APIgetAllToDos = async () => {
  const response = await fetch(`${baseUrl}/todos`, {
    method: "GET",
    headers: {
      "content-type": "application/json",
    },
  });
  if (response.ok) {
    const data = await response.json();
    return data.todos;
  } else {
    console.log("Fetching gone wrong!");
    return [];
  }
};

export const APIaddTask = async (todo) => {
  const response = await fetch(`${baseUrl}/todos/todo`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ todo: todo }),
  });
  if (response.ok) {
    const data = await response.json();
    return data.newToDo;
  } else {
    return false;
  }
};

export const APIdeleteTask = async (id) => {
  const response = await fetch(`${baseUrl}/todos/todo/${id}`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
    },
  });

  if (response.ok) {
    const data = await response.json();
    console.log(data.message);
    return true;
  } else {
    return false;
  }
};
