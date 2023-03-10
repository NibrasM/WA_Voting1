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
      <h3 className="username"> {username}</h3>
      <button className="logout-btn" onClick={handelLogOut}>
        Log out
      </button>
    </div>
  );
}
