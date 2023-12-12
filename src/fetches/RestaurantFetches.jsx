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
