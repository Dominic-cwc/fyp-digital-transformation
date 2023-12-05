import React, { createContext, useEffect, useState } from "react";

// Create a context
export const UserContext = createContext({
  user: null,
  setUser: () => {},
  logout: () => {},
});

// Create a provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const user = sessionStorage.getItem("user");
    if (user) {
      setUser(JSON.parse(user));
    }
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
      value={{ user: user, setUser: setUserHandler, logout: logoutHandler }}
    >
      {children}
    </UserContext.Provider>
  );
};
