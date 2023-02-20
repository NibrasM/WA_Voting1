import { useEffect, useState } from "react";
import PartyCard from "./PartyCard";
import { useCookies } from "react-cookie";
import "./Voting.css";
import Admin from "./Admin";
const parties = [
  {
    name: "A",
    votes: 210,
    img: "https://cdn3.iconfinder.com/data/icons/letters-and-numbers-1/32/letter_A_blue-512.png",
  },
  {
    name: "B",
    votes: 118,
    img: "https://cdn3.iconfinder.com/data/icons/letters-and-numbers-1/32/letter_B_blue-512.png",
  },
  {
    name: "C",
    votes: 500,
    img: "https://cdn3.iconfinder.com/data/icons/letters-and-numbers-1/32/letter_C_blue-512.png",
  },
  {
    name: "D",
    votes: 350,
    img: "https://cdn3.iconfinder.com/data/icons/letters-and-numbers-1/32/letter_D_blue-512.png",
  },
];

export default function Voting() {
  const [partiesArray, setPartiesArray] = useState(parties);
  const [selectedParty, setSelectedParty] = useState(null);
  const [isVoted, setIsVoted] = useState(false);
  const [cookies, setCookie] = useCookies(["loggedInUser"]);
  const [isDone, setIsDone] = useState(false);
  const users = JSON.parse(localStorage.getItem("users"));
  const loggedInUser = cookies.loggedInUser;
  const foundUser = users.find((user) => user.name === loggedInUser.name);

  const [changeToDisable, setChangeToDisable] = useState(true);

  useEffect(() => {
    const pariesData = localStorage.getItem("parties");
    if (pariesData) {
      setPartiesArray(JSON.parse(pariesData));
    } else {
      localStorage.setItem("parties", JSON.stringify(parties));
    }

    const loggedInUser = cookies.loggedInUser;
    if (users && loggedInUser) {
      const foundUser = users.find((user) => user.name === loggedInUser.name);
      console.log("logged user is votted " + foundUser.isVoted);
      setIsVoted(foundUser.isVoted);
      setIsDone(foundUser.isVoted);
    }
  }, []);

  const done = () => {
    localStorage.setItem("parties", JSON.stringify(partiesArray));
    const users = JSON.parse(localStorage.getItem("users"));
    if (users && loggedInUser) {
      const foundUser = users.find((user) => user.name === loggedInUser.name);

      foundUser.isVoted = true;
      localStorage.setItem("users", JSON.stringify(users));
      setIsVoted(true);
      setSelectedParty(null);
      setIsDone(true);
    }
  };

  const change = () => {
    if (isVoted && selectedParty) {
      const partiesCopy = [...partiesArray];
      const foundParty = partiesCopy.find(
        (currentParty) => currentParty.name === selectedParty
      );
      foundParty.votes = foundParty.votes - 1;
      setPartiesArray(partiesCopy);
      if (users && loggedInUser) {
        const foundUser = users.find((user) => user.name === loggedInUser.name);
        foundUser.isVoted = false;
        localStorage.setItem("users", JSON.stringify(users));
        setSelectedParty(null);
        setIsVoted(false);
        setChangeToDisable(false);
      }
    }
  };

  return loggedInUser.type === "admin" && isDone ? (
    <div>
      <h1 className="thank-msg"> Thank you for voting {loggedInUser.name} </h1>
      <Admin usersArray={users}></Admin>
    </div>
  ) : !isDone ? (
    <div className="voting-page-container">
      <div className="parties-container">
        {partiesArray.map((party) => {
          return (
            <PartyCard
              key={party.name}
              party={party}
              parties={partiesArray}
              setParties={setPartiesArray}
              setSelectedParty={setSelectedParty}
              disabled={(isVoted && changeToDisable) || selectedParty}
              setChangeToDisable={setChangeToDisable}
              setIsVoted={setIsVoted}
            ></PartyCard>
          );
        })}
      </div>
      <div>
        <button
          className="done-btn"
          onClick={done}
          disabled={isVoted && !selectedParty}
          style={{
            backgroundColor: !isVoted
              ? "rgb(153, 158, 175)"
              : "rgb(61, 80, 147)",
          }}
        >
          Done
        </button>
        <button
          className="change-btn"
          onClick={change}
          disabled={changeToDisable}
          style={{
            backgroundColor: changeToDisable
              ? "rgb(153, 158, 175)"
              : "rgb(61, 80, 147)",
          }}
        >
          Change
        </button>
      </div>
    </div>
  ) : (
    <div className="thanks">
      <h1 className="thank-msg"> Thank you for voting {loggedInUser.name} </h1>
    </div>
  );
}
