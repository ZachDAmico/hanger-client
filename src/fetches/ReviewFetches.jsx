export const createReview = async (obj, hanger_token) => {
  try {
    const response = await fetch(`http://localhost:8000/reviews`, {
      method: "POST",
      headers: {
        Authorization: `Token ${hanger_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    });

    if (!response.ok) {
      throw new Error("Failed to create review");
    }

    return response.json();
  } catch (error) {
    console.error("Error creating review:", error);
    throw error;
  }
};

export const getReviewById = async (reviewId) => {
  try {
    const response = await fetch(`http://localhost:8000/reviews/${reviewId}`, {
      headers: {
        Authorization: `Token ${
          JSON.parse(localStorage.getItem("hanger_token")).token
        }`,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch review");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error in getReviewById:", error);
    throw error;
  }
};

export const editReview = async (review, reviewId) => {
  return await fetch(`http://localhost:8000/reviews/${reviewId}`, {
    method: "PUT",
    headers: {
      Authorization: `Token ${
        JSON.parse(localStorage.getItem("hanger_token")).token
      }`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(review),
  });
};

export const deleteReview = async (reviewId) => {
  try {
    const response = await fetch(`http://localhost:8000/reviews/${reviewId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Token ${
          JSON.parse(localStorage.getItem("hanger_token")).token
        }`,
      }, // <-- Added closing bracket for the headers object
    });

    if (!response.ok) {
      throw new Error("Failed to delete review");
    }
  } catch (error) {
    console.error("Error deleting review:", error);
    throw error;
  }
};
