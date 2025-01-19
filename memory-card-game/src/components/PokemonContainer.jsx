import "../styles/CardContainer.css";
import Pokemon from "./Card";

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
