import { Route, Routes } from "react-router-dom";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import { Authorized } from "./Authorized";
import { LandingPage } from "../pages/LandingPage";
import { RestaurantDetails } from "../pages/RestaurantDetails";
import { NewReviewForm } from "../pages/NewReviewForm";
import { UserProfile } from "../pages/UserProfile";
import { useEffect, useState } from "react";
import { EditReviewForm } from "../pages/EditReviewForm";

export const ApplicationViews = () => {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const localUser = localStorage.getItem("hanger_token");
    const localUserObject = JSON.parse(localUser);
    setCurrentUser(localUserObject);
  }, []);

  return (
    <Routes>
      <Route
        path="/login"
        element={<Login setCurrentUser={setCurrentUser} />}
      />
      <Route
        path="/register"
        element={<Register setCurrentUser={setCurrentUser} />}
      />
      {/* Outlet element inside Authorized component so all remaining routes will render as children of Authorized - aka if user is authorized to view said routes */}
      <Route element={<Authorized />}>
        <Route path="/" element={<LandingPage currentUser={currentUser} />} />
        <Route
          path="/restaurants/:restaurantId"
          element={<RestaurantDetails currentUser={currentUser} />}
        />
        <Route
          path="/restaurants/:restaurantId/addReview"
          element={<NewReviewForm currentUser={currentUser} />}
        />
        <Route
          path="/profile"
          element={<UserProfile currentUser={currentUser} />}
        />
        <Route
          path="/restaurants/:restaurantId/editReview/:reviewId"
          element={<EditReviewForm currentUser={currentUser} />}
        />
      </Route>
    </Routes>
  );
};
