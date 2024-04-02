import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

// Create a context
export const UserContext = createContext({
  user: null,
  setUser: () => {},
  logout: () => {},
  loading: true,
});

// Create a provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = sessionStorage.getItem("user");
    const parsedUser = user ? JSON.parse(user) : {};

    setLoading(true);
    axios
      .post("/api/validateUser", {
        _id: parsedUser._id,
        username: parsedUser.username,
        name: parsedUser.name,
        role: parsedUser.role,
      })
      .then((res) => {
        if (res.data === "Authenticated") {
          setUser(parsedUser);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  const setUserHandler = (user) => {
    setUser(user);
    sessionStorage.setItem("user", JSON.stringify(user));
  };

  const logoutHandler = () => {
    setUser(null);
    sessionStorage.removeItem("user");
  };

  return (
    <UserContext.Provider
      value={{
        user: user,
        setUser: setUserHandler,
        logout: logoutHandler,
        loading: loading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
