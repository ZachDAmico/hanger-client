import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getRestaurantById } from "../fetches/RestaurantFetches";

export const RestaurantDetails = () => {
  const [restaurantDetails, setRestaurantDetails] = useState({});
  const { restaurantId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getRestaurantById(restaurantId).then((restaurantObj) => {
      setRestaurantDetails(restaurantObj);
    });
  }, [restaurantId]);

  const handleAddingReview = () => {
    navigate(`/restaurants/${restaurantId / add - review}`);
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
        // check this functionality by having restaurant with no reviews!
        <div>
          <p>{restaurantDetails.name}</p>
          <p>Be the first review!</p>
        </div>
      )}
      <button onClick={handleAddingReview}>Add a Review</button>
      <button>
        {restaurantDetails.isFavorite
          ? "Remove from Favorites"
          : "Add to Favorites"}
      </button>
    </div>
  );
};