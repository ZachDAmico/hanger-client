// ReviewFetches.jsx

export const updateReviewFavoriteStatus = async (
  reviewId,
  restaurantId,
  favoriteStatus,
  token
) => {
  return fetch(`http://localhost:8000/favorites/`, {
    method: favoriteStatus ? "POST" : "DELETE",
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ review: reviewId, restaurant: restaurantId }),
  }).then((res) => res.json());
};
