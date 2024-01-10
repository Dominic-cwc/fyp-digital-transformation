import MainPage from "./main-page";

export default function MainContainer({ user, logout }) {
  return (
    <div className="overflow-y-hidden">
      {user.role == "staff" ? <MainPage user={user} logout={logout} /> : null}
      {user.role == "user" ? <MainPage user={user} logout={logout} /> : null}
      {user.role == "deptmanager" ? (
        <MainPage user={user} logout={logout} />
      ) : null}
      {user.role == "centermanager" ? (
        <MainPage user={user} logout={logout} />
      ) : null}
    </div>
  );
}
