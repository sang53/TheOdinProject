import "../styles/GameScreen.css";
import PokemonContainer from "./PokemonContainer";

export default function GameScreen({
  pokemon,
  numDisplay,
  addHistory,
  history,
}) {
  function getDisplay() {
    return pokemon.toSorted(() => Math.random() - 0.5).slice(0, numDisplay);
  }

  return (
    <div id="main" className="flex">
      <h1 id="title">Select a Pokémon:</h1>
      <p id="score">Score: {history.length}</p>
      <button onClick={() => addHistory()}>Re-shuffle</button>
      <PokemonContainer pokemon={getDisplay()} addHistory={addHistory} />
    </div>
  );
}
