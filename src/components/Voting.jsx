import { useEffect } from "react";
import { useState } from "react";
import PartyCard from "./PartyCard";
import { useCookies } from "react-cookie";
import Logout from "./Logout";

const parties = [
  {
    name: "dog",
    votes: 0,
  },
  {
    name: "cat",
    votes: 0,
  },
  {
    name: "cow",
    votes: 0,
  },
  {
    name: "lion",
    votes: 0,
  },
];

export default function Voting({ logIn, username }) {
  const [partiesArray, setPartiesArray] = useState(parties);
  const [selectedParty, setSelectedParty] = useState();
  const [isVoted, setIsVoted] = useState(false);
  const [cookies, setCookie] = useCookies(["loggedInUser"]);
  const [changed, setChanged] = useState(false);

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

  // useEffect(() => {
  //   const storedData = localStorage.getItem("users");
  //   if (storedData) {
  //     setUsersData(JSON.parse(storedData));
  //   }
  // }, []);

  const done = () => {
    localStorage.setItem("parties", JSON.stringify(partiesArray));
    const users = JSON.parse(localStorage.getItem("users"));
    if (users && loggedInUser) {
      const foundUser = users.find((user) => user.name === loggedInUser.name);

      foundUser.isVoted = true;
      localStorage.setItem("users", JSON.stringify(users));
      setIsVoted(true);
      setChanged(false);
    }
  };

  const change = () => {
    if (isVoted) {
      setChanged(true);
    } else if (selectedParty && !changed) {
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

  return (
    <div>
      <label>LoggedIn {username}</label>
      {partiesArray.map((party) => {
        return (
          <PartyCard
            key={party.name}
            party={party}
            parties={partiesArray}
            setParties={setPartiesArray}
            setSelectedParty={setSelectedParty}
            disabled={isVoted || changed}
          ></PartyCard>
        );
      })}
      <button onClick={done} disabled={isVoted}>
        done
      </button>
      <button onClick={change} disabled={!isVoted}>
        change
      </button>
    </div>
  );
}
