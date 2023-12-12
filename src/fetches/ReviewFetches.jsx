export const createReview = async (obj, token) => {
  try {
    const response = await fetch(`http://localhost:8000/reviews`, {
      method: "POST",
      headers: {
        Authorization: `Token ${token}`,
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
