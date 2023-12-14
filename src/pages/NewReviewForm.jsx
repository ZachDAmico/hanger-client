import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createReview } from "../fetches/ReviewFetches";

export const NewReviewForm = () => {
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState("");
  const [favorite, setFavorite] = useState(false);
  const { restaurantId } = useParams();
  const navigate = useNavigate();

  const handleRatingChange = (event) => {
    setRating(parseInt(event.target.value, 10));
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleFavoriteChange = async (event) => {
    setFavorite(event.target.checked);
  };

  // need to create Post fetch for reviews
  const handleSubmit = async (event) => {
    event.preventDefault();

    const reviewObject = {
      restaurant_id: restaurantId,
      rating,
      comment,
      favorite,
    };

    try {
      const userToken = JSON.parse(localStorage.getItem("hanger_token")).token;
      const result = await createReview(reviewObject, userToken);
      console.log("Review created:", result);
      navigate(`/restaurants/${restaurantId}`);
    } catch (error) {
      console.error("Error creating review:", error);
    }
  };

  return (
    <div>
      <h2>Add Your Review</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Comment:
          <textarea value={comment} onChange={handleCommentChange} />
        </label>
        <label>
          Rating:
          <select value={rating} onChange={handleRatingChange}>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
        </label>
        {/* <div>
          <label>Add to Favorites</label>
          <input
            type="checkbox"
            checked={favorite}
            name="favorite"
            id="newFavorite"
            onChange={handleFavoriteChange}
          />
        </div> */}
        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
};
