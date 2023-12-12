import { useState, useEffect } from "react";
import { getAllRestaurants } from "../fetches/RestaurantFetches";

export const LandingPage = () => {
  const [allRestaurants, setAllRestaurants] = useState([]);

  useEffect(() => {
    getAllRestaurants().then((restaurantsArray) => {
      setAllRestaurants(restaurantsArray);
    });
  }, []);

  return (
    <div className="__restaurant-list-container__">
      <h1>Are You Hangry!?</h1>

      {allRestaurants.map((restaurant) => (
        // rating removed from this - might want average user rating displayed for each later
        <div key={restaurant.id}>
          <h2>{restaurant.name}</h2>
          <p>{restaurant.location}</p>
          <p>{restaurant.price_range.price_range}</p>
          <p>{restaurant.hanger_level}</p>
          <p>{restaurant.cuisine.type}</p>
          <p>{restaurant.img_url}</p>
        </div>
      ))}
    </div>
  );
};
