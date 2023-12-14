import { useEffect, useState } from "react";
import { getUser } from "../fetches/UserFetches";
import PropTypes from "prop-types";
export const UserProfile = ({ currentUser }) => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    getUser().then((userArray) => {
      setUsers(userArray);
    });
  }, []);
  return (
    <div>
      <h2>Welcome to Your Profile</h2>
      <div>
        {users.map(
          (user) =>
            // Display first name only if it matches currentUser's ID
            user.id === currentUser.id && (
              <div key={user.id}>
                <div>Profile Pic placeholder</div>
                <div>First Name: {user.first_name}</div>
                <div>Last Name: {user.last_name}</div>
                <div>Username: {user.username}</div>
                <div>Email: {user.email}</div>
                <h3>Favorites: </h3>
                {user.favorite_restaurants &&
                user.favorite_restaurants.length > 0 ? (
                  user.favorite_restaurants.map((restaurant) => (
                    <div key={restaurant.id}>
                      <p>Name: {restaurant.name}</p>
                      <img src={restaurant.img_url} alt={restaurant.name} />
                    </div>
                  ))
                ) : (
                  <p>No favorite restaurants!? Better get to work!</p>
                )}
              </div>
            )
        )}
      </div>
    </div>
  );
};
UserProfile.propTypes = {
  currentUser: PropTypes.shape({
    id: PropTypes.number,
    // Add other prop types for currentUser as needed
  }).isRequired,
};
