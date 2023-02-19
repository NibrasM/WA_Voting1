import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import Admin from "./Admin";
import Logout from "./Logout";
import Voting from "./Voting";
import usePhoto from "./../assets/user.png";
function Login() {
  const users = [
    {
      name: "Tyler-James",
      password: "AiHU39s",
      type: "admin",
      email: "Tyler-James46@walla.co.il",
      isVoted: false,
    },
    {
      name: "Kevan",
      password: "q4KoTQQ",
      type: "user",
      email: "Kevan18@aol.com",
      isVoted: false,
    },
    {
      name: "Aarez",
      password: "jlesOhE",
      type: "user",
      email: "Aarez49@hotmail.com",
      isVoted: false,
    },
    {
      name: "Salahudin",
      password: "0LEv11L",
      type: "user",
      email: "Salahudin28@yahoo.com",
      isVoted: false,
    },
    {
      name: "Ceejay",
      password: "Cr6vsXG",
      type: "user",
      email: "Ceejay34@walla.co.il",
      isVoted: false,
    },
    {
      name: "Maisum",
      password: "IpOODG6",
      type: "user",
      email: "Maisum13@yahoo.com",
      isVoted: false,
    },
    {
      name: "Pawel",
      password: "BsY5Xfg",
      type: "user",
      email: "Pawel31@walla.co.il",
      isVoted: false,
    },
    {
      name: "Robi",
      password: "Tf1Xqyt",
      type: "user",
      email: "Robi31@gmail.com",
      isVoted: false,
    },
    {
      name: "Eli",
      password: "y1JVQus",
      type: "user",
      email: "Eli29@gmail.com",
      isVoted: false,
    },
    {
      name: "Sulayman",
      password: "2IdBBTu",
      type: "user",
      email: "Sulayman24@gmail.com",
      isVoted: false,
    },
    {
      name: "Antoni",
      password: "zGPE3lk",
      type: "user",
      email: "Antoni23@walla.co.il",
      isVoted: false,
    },
    {
      name: "Derren",
      password: "uu0s548",
      type: "user",
      email: "Derren28@yahoo.com",
      isVoted: false,
    },
    {
      name: "Derryn",
      password: "ti9rh6c",
      type: "user",
      email: "Derryn5@yahoo.com",
      isVoted: false,
    },
    {
      name: "Ryan",
      password: "MakBOAM",
      type: "user",
      email: "Ryan39@walla.co.il",
      isVoted: false,
    },
    {
      name: "Darn",
      password: "R0eVIHe",
      type: "user",
      email: "Darn14@gmail.com",
      isVoted: false,
    },
    {
      name: "Liam-Stephen",
      password: "DikwxAF",
      type: "admin",
      email: "Liam-Stephen2@walla.co.il",
      isVoted: false,
    },
    {
      name: "Jordy",
      password: "CYJDYqI",
      type: "admin",
      email: "Jordy29@gmail.com",
      isVoted: false,
    },
    {
      name: "Raheem",
      password: "k4pBUX0",
      type: "user",
      email: "Raheem21@yahoo.com",
      isVoted: false,
    },
    {
      name: "Lewis",
      password: "K7qWpYf",
      type: "user",
      email: "Lewis3@aol.com",
      isVoted: false,
    },
    {
      name: "Aref",
      password: "VrfIwjP",
      type: "user",
      email: "Aref27@aol.com",
      isVoted: false,
    },
    {
      name: "Brayden",
      password: "2lAWtQl",
      type: "user",
      email: "Brayden38@hotmail.com",
      isVoted: false,
    },
    {
      name: "Arjuna",
      password: "fx97ne9",
      type: "user",
      email: "Arjuna7@aol.com",
      isVoted: false,
    },
    {
      name: "Warren",
      password: "67sh1uP",
      type: "admin",
      email: "Warren17@gmail.com",
      isVoted: false,
    },
    {
      name: "Konrad",
      password: "xJMEfkp",
      type: "user",
      email: "Konrad6@hotmail.com",
      isVoted: false,
    },
    {
      name: "Rihards",
      password: "Re7tqR5",
      type: "user",
      email: "Rihards21@yahoo.com",
      isVoted: false,
    },
    {
      name: "Alisdair",
      password: "fY6w77o",
      type: "user",
      email: "Alisdair46@walla.co.il",
      isVoted: false,
    },
    {
      name: "Sam",
      password: "sOkEksI",
      type: "user",
      email: "Sam30@yahoo.com",
      isVoted: false,
    },
    {
      name: "Maciej",
      password: "wJL3RJj",
      type: "user",
      email: "Maciej24@hotmail.com",
      isVoted: false,
    },
    {
      name: "Umut",
      password: "VJk2u5F",
      type: "user",
      email: "Umut9@aol.com",
      isVoted: true,
    },
    {
      name: "Tomas",
      password: "9YSLDWL",
      type: "admin",
      email: "Tomas19@aol.com",
      isVoted: true,
    },
    {
      name: "Nibras",
      password: "000",
      type: "admin",
      email: "nib@gim.com",
      isVoted: false,
    },
  ];

  //to set a new key in object user (isVotted)
  // users.forEach((user) => {
  //   user.isVoted = false;
  // });
  //to know which user logged in
  const [cookies, setCookie] = useCookies(["isLoggedIn"]);
  const [isLogged, setIsLogged] = useState(cookies.isLoggedIn === "ture");

  const [usersData, setUsersData] = useState(users);

  useEffect(() => {
    const storedData = localStorage.getItem("users");
    if (storedData) {
      setUsersData(JSON.parse(storedData));
    } else localStorage.setItem("users", JSON.stringify(users));
    setIsLogged(cookies.isLoggedIn == "true");
  }, []);

  useEffect(() => {
    setCookie("isLoggedIn", isLogged, { path: "/" });
  }, [isLogged]);

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const [loggedUser, setLoggedUser] = useState({
    name: "",
    password: "",
    type: "",
    email: "",
    isVoted: false,
  });

  const loginHandler = (e) => {
    e.preventDefault();
    const foundUser = users.find(
      (user) => user.email === email && user.password === password
    );

    if (foundUser) {
      setLoggedUser(foundUser);
      setCookie("isLoggedIn", true, { path: "/" });
      setCookie("loggedInUser", foundUser, { path: "/" });

      setIsLogged(true);
    } else alert("failed to login");
  };

  return !isLogged ? (
    <div>
      <form className="login-form" onSubmit={loginHandler}>
        <img src={usePhoto} />
        <label>
          UserName:{" "}
          <input
            type="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </label>
        <label>
          Password:{" "}
          <input
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </label>
        <button>Log In</button>
      </form>
    </div>
  ) : (
    <div>
      <Voting logIn={setIsLogged} username={loggedUser.name}></Voting>
      <Admin usersArray={users}></Admin>
      <Logout logIn={setIsLogged}></Logout>;
    </div>
  );
}

export default Login;
