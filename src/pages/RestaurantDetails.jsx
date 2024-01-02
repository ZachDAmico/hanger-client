import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getRestaurantById } from "../fetches/RestaurantFetches";
import { updateReviewFavoriteStatus } from "../fetches/FavoriteFetches";
import { deleteReview } from "../fetches/ReviewFetches";
import PropTypes from "prop-types";
export const RestaurantDetails = ({ currentUser }) => {
  const [restaurantDetails, setRestaurantDetails] = useState({});
  const [favorite, setFavorite] = useState(false);
  const { restaurantId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getRestaurantById(restaurantId).then((restaurantObj) => {
      setRestaurantDetails(restaurantObj);
    });
  }, [restaurantId, currentUser]);

  const handleAddingReview = () => {
    navigate(`/restaurants/${restaurantId}/addReview`);
  };

  const handleEditReview = (reviewId) => {
    navigate(`/restaurants/${restaurantId}/editReview/${reviewId}`);
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      await deleteReview(reviewId);

      getRestaurantById(restaurantId).then((restaurantObj) => {
        setRestaurantDetails(restaurantObj);
      });
    } catch (error) {
      console.error("Error handling review delete:", error.message);
    }
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
    <div className="__review-container__ bg-black">
      <h2 className="__restaurant-name__ text-2xl text-red-600 font-bold mb-3 flex justify-center">
        {restaurantDetails.name}
      </h2>
      <div className="__img-container flex justify-center">
        <img
          src={restaurantDetails.img_url}
          alt={restaurantDetails.name}
          // style={{ width: "200px", height: "auto" }}
          className="__restaurant-img__ w-[500px] h-auto"
        />
      </div>
      <div className="edit-delete-container flex flex-col justify-around items-center my-4">
        <button
          onClick={handleAddingReview}
          className="__review-button__ bg-red-700 text-white py-2 px-4 rounded hover:bg-orange-700 transition-colors duration-300 mt-4 ml-2"
        >
          Add a Review
        </button>
        <div className="favorite-checkbox mt-2">
          <label className="__favorite__ text-white">
            {favorite ? "Remove from Favorites" : "Add to Favorites"}
          </label>
          <input
            type="checkbox"
            checked={favorite}
            name="favorite"
            id="newFavorite"
            onChange={handleFavoriteChange}
          />
        </div>
      </div>
      <div className="__reviews-section__ flex flex-col">
        <h3 className="__review-header__ text-white text-3xl ml-60 mb-2">
          Reviews:
        </h3>
        {restaurantDetails.reviews && restaurantDetails.reviews.length > 0 ? (
          <ul className="__restaurant-details-list__ text-white bg-black space-y-4 flex flex-col items-center justify-center mb-4">
            {restaurantDetails.reviews?.map((review) => (
              <li
                key={review.id}
                className="__review-list__ bg-gray-100 p-4 rounded-lg bg-opacity-25 shadow w-11/12 max-w-4xl"
              >
                <p className="__username__ text-xl font-large text-white">
                  By: {review.user.username}{" "}
                </p>
                <p>Rating: {review.rating}</p>
                <p className="__review__ text-base text-white">
                  {review.comment}
                </p>
                <p>Date: {review.date}</p>
                {currentUser.id === review.user.id && (
                  <>
                    <button
                      onClick={() => handleDeleteReview(review.id)}
                      className="__delete-button__ bg-orange-500 text-white py-2 px-4 rounded hover:bg-red-700 transition-colors duration-300 mt-4 mr-2"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => handleEditReview(review.id)}
                      className="__review-button__ bg-red-700 text-white py-2 px-4 rounded hover:bg-orange-700 transition-colors duration-300 mt-4 ml-2"
                    >
                      Edit
                    </button>
                  </>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <div>
            <p>{restaurantDetails.name}</p>
            <p className="__first-review text-white">Be the first review!</p>
            <button
              onClick={handleAddingReview}
              className="__review-button__ text-white"
            >
              Add a Review
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
RestaurantDetails.propTypes = {
  currentUser: PropTypes.shape({
    id: PropTypes.number,
    // Add other prop types for currentUser as needed
  }).isRequired,
};
