import PokemonCard from "./PokemonCard";

/** List of pokemon components
 *
 *
 * PokemonList -> PokemonCardList
 */

function PokemonCardList({ pokemon }) {
  console.log("* PokemonCardList");

  return (
    <div>
      <div>
        {pokemon.map(pokemon => {
          return (
            <div key={pokemon.id} className="card-body border">
              <PokemonCard pokemon={pokemon} />
            </div>);
        })}
      </div>
    </div >
  );
};

export default PokemonCardList;