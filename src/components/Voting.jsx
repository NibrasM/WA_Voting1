import { useEffect } from "react";
import { useState } from "react";
import PartyCard from "./PartyCard";
import { useCookies } from "react-cookie";
import Logout from "./Logout";
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
  const [changed, setChanged] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const users = JSON.parse(localStorage.getItem("users"));
  const loggedInUser = cookies.loggedInUser;
  const foundUser = users.find((user) => user.name === loggedInUser.name);

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

      setIsVoted(foundUser.isVoted);
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
      setChanged(false);
      setSelectedParty(null);
      setIsDone(true);
    }
  };

  const change = () => {
    console.log("change clicked");
    if (isVoted) {
      setChanged(true);
      console.log("change yes");
    } else if (selectedParty && !changed) {
      console.log("change no");

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
        setIsVoted(false);
        setChanged(true);
      }
    }
  };

  return loggedInUser.type === "admin" && isVoted ? (
    <div>
      <h1 className="thank-msg"> Thank you for voting {loggedInUser.name} </h1>
      <Admin usersArray={users}></Admin>
    </div>
  ) : !isVoted ? (
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
              disabled={(isVoted && !changed) || selectedParty}
            ></PartyCard>
          );
        })}
      </div>
      <div>
        <button
          className="done-btn"
          onClick={done}
          disabled={isVoted && !(changed && selectedParty)}
          style={{
            backgroundColor: isVoted
              ? "rgb(153, 158, 175)"
              : "rgb(61, 80, 147)",
          }}
        >
          Done
        </button>
        <button
          className="change-btn"
          onClick={change}
          disabled={!isVoted || changed}
          style={{
            backgroundColor:
              !isVoted || changed ? "rgb(153, 158, 175)" : "rgb(61, 80, 147)",
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
