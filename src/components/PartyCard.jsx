import "./PartyCard.css";

export default function PartyCard({
  party,
  parties,
  setParties,
  setSelectedParty,
  disabled,
  setChangeToDisable,
  setIsVoted,
}) {
  const vote = () => {
    const partiesCopy = [...parties];
    const foundParty = partiesCopy.find(
      (currentParty) => currentParty.name === party.name
    );
    foundParty.votes = foundParty.votes + 1;
    setParties(partiesCopy);
    setSelectedParty(foundParty.name);
    setChangeToDisable(false);
    setIsVoted(true);
  };
  return (
    <div className="party-container">
      <img src={party.img}></img>
      <p className="party-name">{party.name}</p>
      <label className="party-votes">{party.votes}</label>
      <button
        className="vote-btn"
        onClick={vote}
        disabled={disabled}
        style={{
          backgroundColor: disabled ? "rgb(153, 158, 175)" : "rgb(61, 80, 147)",
        }}
      >
        Vote
      </button>
    </div>
  );
}
