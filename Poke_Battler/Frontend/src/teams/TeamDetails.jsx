import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import PokeApi from "../api/api.jsx";
import PokemonCardList from "../pokemon/PokemonCardList.jsx";

/** Team details page
 *
 * RoutesList -> TeamDetail -> PokemonCard
 */

function TeamDetails() {
  const [team, setTeam] = useState({ data: null, isLoading: true });
  const { handle } = useParams();
  console.log("* TeamDetails");

  useEffect(function fetchteamOnRender() {
    async function fetchTeam() {
      const teamResponse = await PokeApi.getTeams(handle);
      setTeam({
        data: teamResponse,
        isLoading: false
      });
    }
    fetchTeam();
  }, [handle]);

  if (team.isLoading) return <p>Loading...</p>;

  return (
    <div>
      <h1>{team.data.name}</h1>
      <h4>{team.data.users}</h4>
      <PokemonCardList pokemon={team.data.pokemon} />
    </div>
  );
}

export default TeamDetails;