import Login from "../components/component/login";
import MainPage from "../components/component/main-page";
import { useEffect, useContext } from "react";
import { UserContext } from "@/context/UserContext";

export default function index() {
  const { user, setUser, logout } = useContext(UserContext);

  return (
    <>
      {user ? (
        <MainPage user={user} logout={logout} />
      ) : (
        <Login setUser={setUser} />
      )}
    </>
  );
}
