import React, { createContext, useEffect, useState } from "react";

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
    setLoading(true);
    if (user) {
      setUser(JSON.parse(user));
    }
    setLoading(false);
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
