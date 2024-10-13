import TeamCard from "./TeamCard";

/** Team Card
 *
 * TeamList -> TeamCardList -> TeamCard
 */
function TeamCardList({ teams }) {
  console.log("* TeamCard");

  if (!teams || !Array.isArray(teams)) {
    return <p>No teams available.</p>; // Fallback message
  }
  return (
    <div>
      <div>
        {teams.map(team => {
          return (
            <div
              key={team.name}
              className="card-body border">
              <TeamCard team={team} />
            </div>);
        })}
      </div>
    </div >
  );
}

export default TeamCardList;