import { useState } from "react";
import "./Logout.css";
export default function Logout({ logIn, username }) {
  // const LoggedUser = localStorage.getItem("loggedInFoundUser");
  // const [user, setUser] = useState(JSON.parse(LoggedUser));

  // console.log(user.name);
  const handelLogOut = (e) => {
    e.preventDefault();
    logIn(false);
  };
  return (
    <div className="logout-page">
      <h2 className="username"> {username}</h2>

      <button className="logout-btn" onClick={handelLogOut}>
        Log out
      </button>
    </div>
  );
}
