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
      className="__landing-page-background__ bg-black flex flex-col items-center justify-start min-h-screen"
      style={{
        backgroundImage: 'url("https://i.imgur.com/BADyicN.png")',
        backgroundSize: "2500px auto",
        backgroundPosition: "calc(15% - 15px) calc(0% - 300px)",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="__restaurant-list-container__">
        <h1 className="__hangry-header__ text-6xl text-red-600 font-extrabold mb-12 shadow-lg p-3 rounded  mx-auto text-center w-full">
          Are You Hangry!?
        </h1>

        {allRestaurants.map((restaurant) => (
          <div
            key={restaurant.id}
            className="__restaurant-card__ flex bg-white rounded-lg shadow-lg my-4 p-4 bg-opacity-25 w-11/12 max-w-4xl"
          >
            {/* // rating removed from this - might want average user rating displayed */}
            {/* for each later */}
            <div className="__restaurant-name-image-container__ mr-8">
              <h2 style={{ fontSize: "2em", color: "red" }}>
                {restaurant.name}
              </h2>
              <img
                src={restaurant.img_url}
                alt={`Image of ${restaurant.name}`}
                style={{ width: "200px", height: "auto" }}
              />
              <button
                className="bg-orange-500 text-white py-2 px-4 rounded hover:bg-red-700 transition-colors duration-300 mt-4"
                onClick={() => {
                  navigate(`/restaurants/${restaurant.id}`);
                }}
              >
                See Reviews
              </button>
            </div>
            <div className="__restaurant-details__ font-bold flex flex-col justify-center items-center  mr-40">
              <p style={{ color: "red" }}>{restaurant.location}</p>
              <p style={{ color: "red" }}>
                {restaurant.price_range.price_range}
              </p>
              <p style={{ color: "red" }}>
                Hanger Level: {restaurant.hanger_level}
              </p>
              <p style={{ color: "red" }}>{restaurant.cuisine.type}</p>
              {/*img elements are self closing */}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};
