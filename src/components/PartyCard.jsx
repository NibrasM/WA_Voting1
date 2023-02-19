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
    <div>
      <p>{party.name}</p>
      <label>{party.votes}</label>
      <button onClick={vote} disabled={disabled}>
        Vote
      </button>
    </div>
  );
}
