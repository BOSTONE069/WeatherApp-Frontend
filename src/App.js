import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./user/Login";
import ResetEmailLink from "./user/ResetEmailLink";
import ResetPassword from "./user/ResetPassword";
import Signup from "./user/Signup";
import VerifyEmail from "./user/VerifyEmail";

const App = () => {
  return (
    <Routes>
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/signup" element={<Signup />} />
      <Route exact path="/reset" element={<ResetPassword />} />
      <Route exact path="/resetEmailLink" element={<ResetEmailLink />} />
      <Route exact path="/verify/:verificationCode" element={<VerifyEmail />} />
      <Route exact path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default App;
