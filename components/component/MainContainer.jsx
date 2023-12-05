import MainPage from "./main-page";

export default function MainContainer({ user, logout }) {
  return (
    <>
      {user.role == "staff" ? <MainPage user={user} logout={logout} /> : null}
      {user.role == "user" ? <MainPage user={user} logout={logout} /> : null}
      {user.role == "manager" ? <MainPage user={user} logout={logout} /> : null}
    </>
  );
}
