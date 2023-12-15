export const updateReviewFavoriteStatus = (item) => {
  return fetch("http://localhost:8000/favorites", {
    method: "POST",
    headers: {
      Authorization: `Token ${
        JSON.parse(localStorage.getItem("hanger_token")).token
      }`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  });
};
export const getAllUserFavorites = async () => {
  try {
    const response = await fetch("http://localhost:8000/favorites", {
      headers: {
        Authorization: `Token ${
          JSON.parse(localStorage.getItem("hanger_token")).token
        }`,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch favorites");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error in getAllUserfavorites:", error);
    throw error;
  }
};
