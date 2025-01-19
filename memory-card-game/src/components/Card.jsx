import { APIHandler } from "./APIHandler";
import { useState, useEffect } from "react";

export default function Pokemon({ id, addHistory }) {
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
      className={
        "pokemon flex " + (pokemon.types ? pokemon.types[0] : "loading")
      }
      id={`pokemon-${id}`}
      onClick={addHistory && ((e) => addHistory(e.currentTarget.id))}
    >
      <h2 className="name">{pokemon.name}</h2>
      {isLoaded && <img src={pokemon.imgsrc} className="image" />}
      <p className="types">Types: {isLoaded && pokemon.types.join(", ")}</p>
    </div>
  );
}
