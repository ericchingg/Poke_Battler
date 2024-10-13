import React from 'react';

function PokemonMoves({ moves }) {
 
  console.log("Moves prop received:", moves);

  // Ensure moves is always an array
  const movesArray = Array.isArray(moves) ? moves : moves ? [moves] : [];

  return (
    <div>
      <h4>Moves:</h4>
      {movesArray.length > 0 ? (
        <ul>
          {movesArray.map((move) => (
            <li key={move.id}>
              {move.name} - Type: {move.type} - Damage: {move.damage} - Accuracy: {move.accuracy}
            </li>
          ))}
        </ul>
      ) : (
        <p>No moves available.</p>
      )}
    </div>
  );
}

export default PokemonMoves;