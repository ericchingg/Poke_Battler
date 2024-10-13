import SearchForm from "../search/SearchForm.jsx";
import TeamForm from "./TeamForm.jsx";
import TeamCardList from "./TeamCardList.jsx";
import { useState, useEffect } from "react";
import PokeApi from "../api/api.jsx";

/** List all Teams
 *
 *
 * RoutesList -> TeamList -> {SearchForm, TeamCardList, TeamForm}
 */

function TeamList({currentUser}) {
  const [team, setTeam] = useState({ data: null, isLoading: true });
  const [searchParam, setSearchParam] = useState("");
  console.log("* TeamList");

  useEffect(function fetchTeamsOnSearch() {
    async function fetchTeams() {
      let teamResponse;
      if (searchParam === "") {
        teamResponse = await PokeApi.getTeam(searchParam);
      }
      else {
        teamResponse = await PokeApi.getTeams();
      }
      setTeam(
        {
          data: teamResponse,
          isLoading: false
        }
      );
    }
    fetchTeams();
  }, [searchParam]);

  /** Update team and search param state when
   *  a new parameter is received
   */
  function onTeamSearch(searchParam) {
    setTeam(currTeam => ({...currTeam, isLoading: true}));
    setSearchParam(searchParam);
  }


  const handleCreateTeam = async (formData) => {
    try {
      const newTeam = await PokeApi.create(formData); 
      setTeam(curr => ({ ...curr, data: [...curr.data, newTeam] })); 
      console.log(team);
    } catch (error) {
      console.error("Error creating team:", error);
    }
  };

  if (team.isLoading) return <p>Loading...</p>;

  return (
    <div>
      <SearchForm handleSearch={onTeamSearch} />
      {searchParam
        ? <h3>Results for '{searchParam}'</h3>
        : <h3>All Teams</h3>
      }
      <TeamCardList teams={team.data} />
      <TeamForm handleCreate={handleCreateTeam} currentUser={currentUser}/>
    </div>
  );
};

export default TeamList;