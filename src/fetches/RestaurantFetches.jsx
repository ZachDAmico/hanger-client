export const getAllRestaurants = () => {
  return fetch(`http://localhost:8000/restaurants`, {
    headers: {
      Authorization: `Token ${
        JSON.parse(localStorage.getItem("hanger_token")).token
      }`,
    },
  }).then((response) => response.json());
};
