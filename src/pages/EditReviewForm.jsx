import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { editReview, getReviewById } from "../fetches/ReviewFetches";

export const EditReviewForm = () => {
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState("");
  const { restaurantId, reviewId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReviewData = async () => {
      try {
        const userToken = JSON.parse(
          localStorage.getItem("hanger_token")
        ).token;
        const existingReview = await getReviewById(reviewId, userToken);
        setRating(existingReview.rating);
        setComment(existingReview.comment);
      } catch (error) {
        console.error("Error fetching review data:", error);
      }
    };

    fetchReviewData();
  }, [reviewId]);

  const handleRatingChange = (event) => {
    setRating(parseInt(event.target.value, 10));
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const editedReview = {
      restaurant_id: restaurantId,
      rating,
      comment,
    };

    try {
      const userToken = JSON.parse(localStorage.getItem("hanger_token")).token;
      const result = await editReview(editedReview, reviewId, userToken);
      console.log("Review edited:", result);
      navigate(`/restaurants/${restaurantId}`);
    } catch (error) {
      console.error("Error editing review:", error);
    }
  };

  return (
    <div className="__edit-review-container__ min-h-screen bg-black">
      <h2 className="__edit-header__ text-2xl text-red-600 font-bold mb-10 flex justify-center">
        Edit Your Review
      </h2>
      <div className="__review-form-card__ flex justify-center">
        <form
          onSubmit={handleSubmit}
          className="__edit-form__ bg-gray-100 p-4 rounded-lg bg-opacity-25 shadow w-11/12 max-w-4xl flex flex-col mb-6"
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
            className="__submit-edit-button__ bg-red-700 text-white py-2 px-4 rounded hover:bg-orange-700 transition-colors duration-300 mt-4 ml-2"
            type="submit"
          >
            Submit Edited Review
          </button>
        </form>
      </div>
    </div>
  );
};
