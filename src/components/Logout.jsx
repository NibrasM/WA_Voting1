import { useCookies } from "react-cookie";
import "./Logout.css";
export default function Logout({ logIn, username }) {
  // const users = JSON.parse(localStorage.getItem("users"));
  // const foundUser = users.find((user) => user.name === username);

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
