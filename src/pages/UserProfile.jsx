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
    <div className="__profile-background__ min-h-screen bg-black">
      {/* <h2>Welcome to Your Profile</h2> */}
      <div>
        {user ? (
          <section className="__profile-container__">
            <div className="__profile-details__ bg-black flex flex-col items-center">
              <div key="info-1" className="__profile-pic__ text-white">
                Profile Pic placeholder
              </div>
              {/* <div key="info-2">First Name: {user.first_name}</div> */}
              {/* <div key="info-3">Last Name: {user.last_name}</div> */}
              <div key="info-4" className="__username__ text-white">
                Username: {user.username}
              </div>
              <div key="info-5" className="__email__ text-white">
                Email: {user.email}
              </div>
            </div>
            <h3 className="__favorites-header__ text-red-700 bg-black text-3xl flex justify-center mt-8 mb-2">
              Favorites:{" "}
            </h3>
            <div className="__img-grid__ grid grid-cols-3 gap-8">
              {userFavorites.map((favorite, idx) => (
                <div
                  key={idx}
                  className="__img-container__ flex justify-center flex-row"
                >
                  <img
                    src={favorite.restaurant.img_url}
                    className="__restaurant-img__ w-[200px] h-auto"
                  />
                </div>
              ))}
            </div>
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
