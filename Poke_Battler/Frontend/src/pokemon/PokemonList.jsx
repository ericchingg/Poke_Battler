import PokemonCardList from "./PokemonCardList.jsx";
import SearchForm from "../search/SearchForm.jsx";
import PokeApi from "../api/api.jsx";
import { useState, useEffect } from "react";
import './PokemonList.css';

/** List of all pokemon
 *
 * RoutesList -> PokemonList -> {SearchForm, PokemonCardList}
 */

function PokemonList() {
  const [pokemon, setPokemon] = useState({ data: null, isLoading: true });
  const [searchParam, setSearchParam] = useState("");
  console.log("* PokemonList");

  useEffect(function fetchPokemonsOnSearch() {
    async function fetchPokemon() {
      let pokemonResponse;
      if (searchParam === '') {
        pokemonResponse = await PokeApi.getAllPokemons();
      } else {
        pokemonResponse = await PokeApi.getPokemon(searchParam);
      }
      setPokemon(
        {
          data: pokemonResponse,
          isLoading: false
        }
      );
    }
    fetchPokemon();
  }, [searchParam]);

  /** Update job and search parameter state when
   *  a new parameter is received
   */
  function onPokemonSearch(searchParam) {
    setPokemon(currPokemon => ({...currPokemon, isLoading: true}));
    setSearchParam(searchParam);
  }

  if (pokemon.isLoading) return <p>Loading...</p>;

  return (
    <div>
      <SearchForm handleSearch={onPokemonSearch} />
      {searchParam
        ? <h3>Results for '{searchParam}'</h3>
        : <h3>All Pokemon</h3>}
      <div class='pokemon-list'>
      <PokemonCardList pokemon={pokemon.data} />
      </div>  
    </div>
  );
}

export default PokemonList;