import "./PartyCard.css";

export default function PartyCard({
  party,
  parties,
  setParties,
  setSelectedParty,
  disabled,
}) {
  const vote = () => {
    const partiesCopy = [...parties];
    const foundParty = partiesCopy.find(
      (currentParty) => currentParty.name === party.name
    );
    foundParty.votes = foundParty.votes + 1;
    setParties(partiesCopy);
    setSelectedParty(foundParty.name);
  };

  return (
    <div className="party-container">
      <p className="party-name">{party.name}</p>
      <label className="party-votes">{party.votes}</label>
      <button className="vote-btn" onClick={vote} disabled={disabled}>
        Vote
      </button>
    </div>
  );
}
