import { useEffect, useState } from "react";
import { APIHandler } from "./APIHandler";
import "../styles/CardContainer.css";

export default function PokemonContainer({ pokemon, addHistory }) {
  const output = pokemon.length ? (
    <>
      {pokemon.map((id) => {
        return <Pokemon key={id} id={id} addHistory={addHistory} />;
      })}
    </>
  ) : (
    <div>Loading...</div>
  );
  return (
    <div id="pokemon-container" className="flex">
      {output}
    </div>
  );
}

function Pokemon({ id, addHistory }) {
  const pokemon = APIHandler.getPokemon(id);
  const [isLoaded, setIsLoaded] = useState(pokemon.loaded);

  useEffect(() => {
    async function loadPokemon() {
      await APIHandler.loadPokemon(id);
      setIsLoaded(true);
    }
    loadPokemon();
  }, [id]);

  return (
    <div
      className="pokemon flex"
      id={`pokemon-${id}`}
      onClick={addHistory && ((e) => addHistory(e.currentTarget.id))}
    >
      <h2 className="name">{pokemon.name}</h2>
      {isLoaded && <img src={pokemon.imgsrc} className="image" />}
      <p className="types">Types: {isLoaded && pokemon.types.join(", ")}</p>
    </div>
  );
}
