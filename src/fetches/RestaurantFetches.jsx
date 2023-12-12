export const getAllRestaurants = async () => {
  try {
    const response = await fetch("http://localhost:8000/restaurants", {
      headers: {
        Authorization: `Token ${
          JSON.parse(localStorage.getItem("hanger_token")).token
        }`,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch restaurants");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error in getAllRestaurants:", error);
    throw error;
  }
};
// does this need token passed a prop along with restaurantId?
export const getRestaurantById = async (restaurantId) => {
  try {
    const response = await fetch(
      `http://localhost:8000/restaurants/${restaurantId}`,
      {
        headers: {
          Authorization: `Token ${
            JSON.parse(localStorage.getItem("hanger_token")).token
          }`,
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch restaurant");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error in getRestaurantById:", error);
    throw error;
  }
};
