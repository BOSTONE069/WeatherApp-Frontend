import React, { useContext, useState, useEffect } from "react";

import { Route, Routes, Navigate } from "react-router-dom";
import Login from "../user/Login";
import ResetEmailLink from "../user/ResetEmailLink";
import ResetPassword from "../user/ResetPassword";
import Signup from "../user/Signup";
import VerifyEmail from "../user/VerifyEmail";

import LoadingIndicator from "../components/LoadingIndicator/LoadingIndicator";
import WeatherData from "../components/CurrentWeatherData/WeatherData";
import HistoryWeatherData from "../components/HistoryWeatherData/HistoryWeatherData";
import WelcomePage from "../components/WelcomePage/WelcomePage";

import { AppContext } from "../Context/applicationContext";
import Header from "../components/Header/Header.js";

const App = () => {
  const appContext = useContext(AppContext);
  const userData = appContext.getSession(); // getting the  data from cookies

  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    if (userData) {
      setCurrentUser(userData);
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [userData]);

  if (isAuthenticated === null) return <LoadingIndicator />;

  if (isAuthenticated === false) {
    return (
      <Routes>
        <Route path="*" element={<Navigate to="/login" replace />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route
          exact
          path="/reset/:verificationToken"
          element={<ResetPassword />}
        />
        <Route
          exact
          path="/reset/:verificationToken"
          element={<ResetPassword />}
        />
        <Route exact path="/resetEmailLink" element={<ResetEmailLink />} />
        <Route
          exact
          path="/verify/:verificationCode"
          element={<VerifyEmail />}
        />
      </Routes>
    );
  } else {
    return (
      <Routes>
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route
          exact
          path="/"
          element={
            <Header>
              <WelcomePage currentUser={currentUser} />
            </Header>
          }
        />

        <Route
          exact
          path="/historyWeatherData"
          element={
            <Header>
              <HistoryWeatherData currentUser={currentUser} />
            </Header>
          }
        />

        <Route
          exact
          path="/currentWeatherData"
          element={
            <Header>
              <WeatherData currentUser={currentUser} />
            </Header>
          }
        />
      </Routes>
    );
  }
};

export default App;
