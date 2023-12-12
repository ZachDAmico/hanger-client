import { useState, useEffect } from "react";
import { getAllRestaurants } from "../fetches/RestaurantFetches";
import { useNavigate } from "react-router-dom";

export const LandingPage = () => {
  const [allRestaurants, setAllRestaurants] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllRestaurants().then((restaurantsArray) => {
      setAllRestaurants(restaurantsArray);
    });
  }, []);

  return (
    <div className="__restaurant-list-container__">
      <h1>Are You Hangry!?</h1>

      {allRestaurants.map((restaurant) => (
        <div key={restaurant.id}>
          {/* // rating removed from this - might want average user rating displayed */}
          {/* for each later */}
          <h2>{restaurant.name}</h2>
          <p>{restaurant.location}</p>
          <p>{restaurant.price_range.price_range}</p>
          <p>Hanger Level: {restaurant.hanger_level}</p>
          <p>{restaurant.cuisine.type}</p>
          <p>{restaurant.img_url}</p>
          <button
            // currently not going to correct link
            onClick={() => {
              navigate(`/restaurants/${restaurant.id}`);
            }}
          >
            See Reviews
          </button>
        </div>
      ))}
    </div>
  );
};
