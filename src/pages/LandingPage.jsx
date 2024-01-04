import { useState, useEffect } from "react";
import { getAllRestaurants } from "../fetches/RestaurantFetches";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFire } from "@fortawesome/free-solid-svg-icons";

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
      className="__landing-page-background__ bg-black flex flex-col items-center justify-start min-h-screen bg-fixed"
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
            <div className="__restaurant-name-image-container__ mr-20">
              <div className="__restaurant-name-container__ text-center">
                <h2 className="__restaurant-name__ text-2xl text-red-600 font-bold mb-3 truncate">
                  {restaurant.name}
                </h2>
              </div>
              <p className="__location__ text-red-600 text-center font-semibold">
                {restaurant.location}
              </p>
              <img
                src={restaurant.img_url}
                alt={`Image of ${restaurant.name}`}
                style={{ width: "200px", height: "auto" }}
              />
              <button
                className="__review-button__ bg-orange-500 text-white py-2 px-4 rounded hover:bg-red-700 transition-colors duration-300 mt-4"
                onClick={() => {
                  navigate(`/restaurants/${restaurant.id}`);
                }}
              >
                See Reviews
              </button>
            </div>
            <div className="__restaurant-details__ font-bold flex flex-col justify-center items-center whitespace-nowrap mr-40">
              {/* <p className="__location__ text-red-600">{restaurant.location}</p> */}
              <p className="__price-range__ text-red-600">
                {restaurant.price_range.price_range}
              </p>
              <p className="__hanger-level__ text-red-600">
                Hanger Level:{" "}
                {/* Array.from() creates a new Array instance. takes an object with a length property and creates an array with that length, filled with undefined values by default. We then .map() over this array, and for each undefined element (which we don't use, hence the _ as a placeholder), we return a flame icon */}
                {Array.from({ length: restaurant.hanger_level }).map(
                  (_, index) => (
                    // We map over this array and return a FontAwesomeIcon component for each undefined element
                    // The key property gives each icon a unique key, which React uses for rendering optimization
                    <FontAwesomeIcon
                      key={index}
                      icon={faFire}
                      className="text-red-600"
                    />
                  )
                )}
              </p>
              <p className="__cuisine-type__ text-red-600">
                {restaurant.cuisine.type}
              </p>
              {/*img elements are self closing */}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};
