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
    <div>
      <h2>Edit Your Review</h2>
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
        <button type="submit">Submit Edited Review</button>
      </form>
    </div>
  );
};
