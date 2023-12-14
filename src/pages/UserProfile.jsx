import { useEffect, useState } from "react";
import { getUser } from "../fetches/UserFetches";
import PropTypes from "prop-types";
import { getAllUserFavorites } from "../fetches/FavoriteFetches";

export const UserProfile = ({ currentUser }) => {
  const [user, setUser] = useState();
  const [userFavorites, setUserFavorites] = useState([]);

  // useEffect(() => {
  //   getUser().then((userObj) => {
  //     setUser(userObj);
  //     getAllUserFavorites().then((favArray) => {
  //       setUserFavorites(favArray);
  //     });
  //   });
  // }, []);
  useEffect(() => {
    // Check if currentUser.id exists before making the request
    if (currentUser && currentUser.id) {
      getUser(currentUser.id).then((userObj) => {
        setUser(userObj);
        getAllUserFavorites().then((favArray) => {
          setUserFavorites(favArray);
        });
      });
    }
  }, [currentUser]);

  return (
    <div>
      <h2>Welcome to Your Profile</h2>
      <div>
        {user ? (
          <div key={user.id}>
            <div>Profile Pic placeholder</div>
            <div>First Name: {user.first_name}</div>
            <div>Last Name: {user.last_name}</div>
            <div>Username: {user.username}</div>
            <div>Email: {user.email}</div>
            <h3>Favorites: </h3>
            {userFavorites.map((favorite) => (
              <div key={favorite.restaurant.id}>{favorite.restaurant.name}</div>
            ))}
          </div>
        ) : (
          <div>Loading or Error Message</div>
        )}
      </div>
    </div>
  );
};

UserProfile.propTypes = {
  currentUser: PropTypes.shape({
    id: PropTypes.number,
    // Add other prop types for currentUser as needed
  }),
};
