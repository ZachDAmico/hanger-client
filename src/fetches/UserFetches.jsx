export const getUser = (id) => {
  return fetch(`http://localhost:8000/users/${id}`, {
    headers: {
      Authorization: `Token ${
        JSON.parse(localStorage.getItem("hanger_token")).token
      }`,
    },
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error(`Error fetching user by ID ${id}:`, error);
    });
};
