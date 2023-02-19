import { useCookies } from "react-cookie";

export default function Logout({ logIn }) {
  const handelLogOut = (e) => {
    e.preventDefault();
    logIn(false);
  };
  return (
    <div>
      <p>Thank you for voting</p>
      <button onClick={handelLogOut}>Log out</button>
    </div>
  );
}
