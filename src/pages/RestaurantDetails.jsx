import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getRestaurantById } from "../fetches/RestaurantFetches";
import { updateReviewFavoriteStatus } from "../fetches/FavoriteFetches";
export const RestaurantDetails = () => {
  const [restaurantDetails, setRestaurantDetails] = useState({});
  const [favorite, setFavorite] = useState(false);
  const { restaurantId } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    getRestaurantById(restaurantId).then((restaurantObj) => {
      setRestaurantDetails(restaurantObj);
    });
  }, [restaurantId]);
  const handleAddingReview = () => {
    navigate(`/restaurants/${restaurantId}/addReview`);
  };
  const handleFavoriteChange = async (event) => {
    setFavorite(event.target.checked);
    try {
      await updateReviewFavoriteStatus({ restaurant: restaurantId });
      // updates the state
    } catch (error) {
      console.error("Error updating favorite status:", error.message);
      if (error instanceof Response) {
        // Handles any HTTP response error
        console.error("HTTP Status:", error.status);
      } else {
        // Handle other types of errors
      }
    }
  };
  return (
    <div>
      <h2>{restaurantDetails.name}</h2>
      <img src={restaurantDetails.img_url} alt={restaurantDetails.name} />
      <h3>Reviews:</h3>
      {restaurantDetails.reviews && restaurantDetails.reviews.length > 0 ? (
        <ul>
          {restaurantDetails.reviews?.map((review) => (
            <li key={review.id}>
              <p>By: {review.user.username}</p>
              <p>Rating: {review.rating}</p>
              <p>{review.comment}</p>
              <p>Date: {review.date}</p>
            </li>
          ))}
        </ul>
      ) : (
        <div>
          <p>{restaurantDetails.name}</p>
          <p>Be the first review!</p>
        </div>
      )}
      <button onClick={handleAddingReview}>Add a Review</button>
      <div>
        <label>{favorite ? "Remove from Favorites" : "Add to Favorites"}</label>
        <input
          type="checkbox"
          checked={favorite}
          name="favorite"
          id="newFavorite"
          onChange={handleFavoriteChange}
        />
      </div>
    </div>
  );
};
