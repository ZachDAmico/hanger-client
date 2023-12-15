import { useEffect, useState } from "react";
import { getUser } from "../fetches/UserFetches";
import PropTypes from "prop-types";
import { getAllUserFavorites } from "../fetches/FavoriteFetches";

export const UserProfile = ({ currentUser }) => {
  const [user, setUser] = useState({});
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
      getUser(currentUser?.id).then((userObj) => {
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
          <section>
            <div key="info-1">Profile Pic placeholder</div>
            <div key="info-2">First Name: {user.first_name}</div>
            <div key="info-3">Last Name: {user.last_name}</div>
            <div key="info-4">Username: {user.username}</div>
            <div key="info-5">Email: {user.email}</div>
            <h3>Favorites: </h3>
            {userFavorites.map((favorite, idx) => (
              <div key={idx}>{favorite.restaurant.name}</div>
            ))}
          </section>
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
