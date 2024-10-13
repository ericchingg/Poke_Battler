import { NavLink } from "react-router-dom";
import "./TeamCard.css";

/** Team card
 *
 * TeamCardList -> TeamList
 */

function TeamCard({ team }) {
  console.log("* TeamCard");

  return (
    <NavLink to={`/teams/${team.id}`}>
      <div>
        <p><b>{team.name}</b></p>
        <p>{team.user_id}</p>
      </div>
    </NavLink>
  );
}

export default TeamCard;