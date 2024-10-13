import { useState, useEffect } from "react";
import './Battle.css'
import PokeApi from "../api/api";
import PokemonMoves from "../pokemon/PokemonMoves";
import BattleLog from "./BattleLog";


function Battle({ currUser }) {

  const [myStartingPokemon, setmyStartingPokemon] = useState({ data: null, isLoading: true });
  const [opponent, setOpponent] = useState({ oppData: null, oppIsLoading: true });
  const [myHp, setMyHp] = useState(null);
  const [oppHp, setOppHp] = useState(null);
  const [isPlayerTurn, setIsPlayerTurn] = useState(true); // Track whose turn it is
  const [battleEvents, setBattleEvents] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  console.log("* Battle");

  const randomNumber = Math.floor(Math.random() * 3) + 1;

  useEffect(function fetchPokemon() {
    async function fetchPokemon() {
      try {
        let pokemonResponse = await PokeApi.getPokemon(1);
        let opponentResponse = await PokeApi.getPokemon(randomNumber);

        const movesResponse = await Promise.all([
          PokeApi.getMovesForPokemon(pokemonResponse.id), 
          PokeApi.getMovesForPokemon(opponentResponse.id)
        ]);

        setmyStartingPokemon({
            data:{ 
              ...pokemonResponse,
              moves: movesResponse[0]
            }, 
            isLoading: false
        });
        setOpponent({
          oppData:{ 
            ...opponentResponse,
            moves: movesResponse[1]
          }, 
          isLoading: false
        });
        setMyHp(pokemonResponse.health);
        setOppHp(opponentResponse.health);

      } catch (error) {
        console.error("Error fetching Pokémon:", error);
        setmyStartingPokemon({ data: null, isLoading: false }); // Handle error state
        setOpponent({ oppData: null, oppIsLoading: false });
      }
    }
    fetchPokemon();
  }, []);

console.log(myStartingPokemon);
console.log(opponent);

 // Destructure the Pokémon data
 const { data, isLoading } = myStartingPokemon;
 const { oppData, oppIsLoading } = opponent;

 if (isLoading || oppIsLoading) {
   return <p>Loading Pokémon...</p>; // Loading state
 }

 if (!data || !oppData) {
   return <p>No Pokémon data available.</p>; // Error state
 }


 console.log("My Pokémon Data:", data);
 console.log("Opponent Pokémon Data:", oppData);

 const attack = () => {
  if (!data.moves || !oppData.moves) {
    console.error("No moves available for either Pokémon.");
    return; // Exit early if no moves are available
  }

  const move = data.moves; // User's move
  const damage = move.damage;

// Update opponent's health
setOppHp((prevHp) => {
  const newHp = Math.max(prevHp - damage, 0);
  if (newHp === 0) {
    setBattleEvents((prev) => [...prev, `Player's ${data.name} used ${move.name} and knocked out ${oppData.name}!`]);
  } else {
    setBattleEvents((prev) => [...prev, `Player's ${data.name} used ${move.name} for ${damage} damage! ${oppData.name} has ${newHp} HP left.`]);
  }
  return newHp;
});

if (oppHp <= damage) {
  alert(`${oppData.name} fainted! You win!`);
  setGameOver(true);
  return;
}

setIsPlayerTurn(false); // Switch to opponent's turn
setTimeout(opponentAttack, 2000);
};

const opponentAttack = () => {
if (!oppData.moves) {
  console.error("No moves available for the opponent.");
  return;
}

const oppMove = oppData.moves;
const oppDamage = oppMove.damage;

setMyHp((prevHp) => {
  const newHp = Math.max(prevHp - oppDamage, 0);
  if (newHp === 0) {
    setBattleEvents((prev) => [...prev, `Opponent's ${oppData.name} used ${oppMove.name} for ${oppDamage} damage! ${data.name} has fainted!`]);
  } else {
    setBattleEvents((prev) => [...prev, `Opponent's ${oppData.name} used ${oppMove.name} for ${oppDamage} damage! ${data.name} has ${newHp} HP left.`]);
  }
  return newHp;
});

if (myHp <= oppDamage) {
  alert(`Your ${data.name} fainted! You lose!`);
  setGameOver(true);
  return;
}

  // Switch back to player's turn
  setIsPlayerTurn(true);
};

return (
  <div className='pokemon-container'>
    <div className="battle-field"> 
      <div className="my-pokemon">
        <img src={data.sprite} alt={`${data.name} sprite`} />
        <h3>{data.name}</h3>
        <p>Health: {myHp}</p>
        <PokemonMoves moves={data.moves} />
        {isPlayerTurn && !gameOver && <button onClick={attack}>Attack</button>}
      </div>

      <div className="opp-pokemon">
        <img src={oppData.sprite} alt={`${oppData.name} sprite`} />
        <h3>{oppData.name}</h3>
        <p>Health: {oppHp}</p>
        <PokemonMoves moves={oppData.moves} />
      </div>
      <BattleLog battleEvents={battleEvents} />
    </div>
  </div>
);
}

export default Battle;