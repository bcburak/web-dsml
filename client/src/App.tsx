import React, { useState, useLayoutEffect, useEffect } from "react";
import { useCookies } from "react-cookie";

import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import Login from "./components/Auth/Login";
import Home, { User } from "./components/Home/Home";

const App = () => {
  const [user, setUser] = useState<User>(null);

  useEffect(() => {
    const theUser = localStorage.getItem("user");
    console.log("theUser", theUser);
    console.log("useremail", user?.email);

    if (theUser && !theUser.includes("undefined")) {
      setUser(JSON.parse(theUser));
      console.log("user", JSON.parse(theUser));
    }
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={user?.email ? <Navigate to="/designer" /> : <Login />}
        />
        <Route
          path="/designer"
          element={
            user?.email ? <Home user={user} /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/"
          element={user?.email ? <Navigate to="/designer" /> : <Login />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
