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

  // const handleFavoriteChange = async (event) => {
  //   setFavorite(event.target.checked);
  // };

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
    <div className="__new-review-container__ min-h-screen bg-black">
      <h2 className="__review-header__ text-2xl text-red-600 font-bold mb-10 flex justify-center">
        Add Your Review
      </h2>
      <div className="__review-form-card__ flex justify-center">
        <form
          onSubmit={handleSubmit}
          className="__review-form__ bg-gray-100 p-4 rounded-lg bg-opacity-25 shadow w-11/12 max-w-4xl flex flex-col mb-6"
        >
          <label className="__comment-label__ text-white mb-4 mr-4">
            Comment:
            <textarea
              value={comment}
              onChange={handleCommentChange}
              rows="1"
              className="__comment-area__ text-black ml-2"
            />
          </label>
          <label className="__rating-label__ text-white mb-10 mr-2">
            Rating:
            <select
              value={rating}
              onChange={handleRatingChange}
              className="__rating-text__ text-black ml-2"
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
            </select>
          </label>

          <button
            className="__submit-review-button__ bg-red-700 text-white py-2 px-4 rounded hover:bg-orange-700 transition-colors duration-300 mt-4 ml-2"
            type="submit"
          >
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
};
