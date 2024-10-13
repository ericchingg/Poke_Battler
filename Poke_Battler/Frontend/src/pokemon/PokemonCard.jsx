import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PokemonMoves from './PokemonMoves';

/** Pokemon card
 
 *
 * PokemonCardList -> PokemonCard
 */

function PokemonCard({ pokemon, currentUser }) {
  console.log("* PokemonCard");
  
  // State to track whether the user has applied for the job
  // const [onTeam, setOnTeam] = useState(false);

  // useEffect(() => {
  //   // Check if the user has already applied for this job
  //   const checkTeamStatus = async () => {
  //     try {
  //       const response = await axios.get(`/api/user/${currentUser}/teams`);
  //       const currTeam = response.data; // Assuming this returns an array of applied job IDs
  //       setOnTeam(currTeam.includes(pokemon.id));
  //     } catch (error) {
  //       console.error("Error checking team status:", error);
  //     }
  //   };

  //   checkTeamStatus();
  // }, [pokemon.id, currentUser]);

  // const handleApply = async () => {
  //   try {
  //     await axios.post(`/api/teams/${pokemon.id}/add`, { username: currentUser });
  //     setOnTeam(true);

  //   } catch (error) {
  //     console.error("Error adding to the team:", error);
  //   }
  // };

  return (
    <div>
      <img src={pokemon.sprite} alt={pokemon.name} />
      <h3>{pokemon.name}</h3>
      <p>Type: {pokemon.type}</p>
      <p>Health: {pokemon.health}</p>
      <PokemonMoves moves={pokemon.moves}/>

      {/* <button onClick={handleApply} disabled={onTeam}>
        {onTeam ? "Added" : "Add to Team"}
      </button> */}
    </div>
  );
}

export default PokemonCard;