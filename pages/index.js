import Login from "../components/component/login";
import MainPageContainer from "../components/component/MainContainer";
import { useEffect, useContext } from "react";
import { UserContext } from "@/context/UserContext";

export default function index() {
  const { user, setUser, logout } = useContext(UserContext);

  return (
    <>
      {user ? (
        <MainPageContainer user={user} logout={logout} />
      ) : (
        <Login setUser={setUser} />
      )}
    </>
  );
}
