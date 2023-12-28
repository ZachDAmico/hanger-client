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
    <main
      className="__landing-page-background__"
      style={{
        backgroundImage: 'url("https://i.imgur.com/BADyicN.png")',
        backgroundSize: "2500px auto", // Set the width to 1500px and let the height auto-adjust
        backgroundPosition: "calc(15% - 15px) calc(0% - 250px)", // Adjust as necessary
        backgroundRepeat: "no-repeat", // Prevent the background image from repeating
        backgroundColor: "black",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <div className="__restaurant-list-container__">
        <h1 style={{ fontSize: "3em", color: "red" }}>Are You Hangry!?</h1>

        {allRestaurants.map((restaurant) => (
          <div key={restaurant.id}>
            {/* // rating removed from this - might want average user rating displayed */}
            {/* for each later */}
            <h2 style={{ fontSize: "2em", color: "red" }}>{restaurant.name}</h2>
            <p style={{ color: "red" }}>{restaurant.location}</p>
            <p style={{ color: "red" }}>{restaurant.price_range.price_range}</p>
            <p style={{ color: "red" }}>
              Hanger Level: {restaurant.hanger_level}
            </p>
            <p style={{ color: "red" }}>{restaurant.cuisine.type}</p>
            <p style={{ color: "red" }}>{restaurant.img_url}</p>
            <button
              style={{ color: "red" }}
              onClick={() => {
                navigate(`/restaurants/${restaurant.id}`);
              }}
            >
              See Reviews
            </button>
          </div>
        ))}
      </div>
    </main>
  );
};
