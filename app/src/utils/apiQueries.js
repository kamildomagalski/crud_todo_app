const baseUrl = "http://localhost:8080/todos";
export const APIgetAllToDos = async () => {
  const response = await fetch(`${baseUrl}/`, {
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
  const response = await fetch(`${baseUrl}/todo`, {
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
  const response = await fetch(`${baseUrl}/todo/${id}`, {
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
