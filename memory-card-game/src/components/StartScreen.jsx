import PokemonContainer from "./PokemonContainer";
import { APIHandler } from "./APIHandler";
import "../styles/StartScreen.css";

export default function StartScreen(props) {
  return (
    <div id="main" className="flex">
      <h1 id="title">Pokémon Memory Game</h1>
      <div id="selectors" className="flex">
        <PokedexSelector changeDex={props.changeDex} currDex={props.currDex} />
        <NumDisplaySelector
          changeNum={props.changeNum}
          numDisplay={props.numDisplay}
        />
        <TotalSelector
          pokemon={props.pokemon}
          changeTotal={props.changeTotal}
        />
      </div>
      <div className="flex" id="start-buttons">
        <button onClick={props.progressGame}>Start</button>
        <button onClick={props.reshuffle}>Re-shuffle</button>
      </div>

      <PokemonContainer pokemon={props.pokemon} />
    </div>
  );
}

function PokedexSelector({ currDex, changeDex }) {
  const pokedexArr = APIHandler.getAllPokedex();

  const dexOptions = pokedexArr ? (
    pokedexArr.map((pokedex) => {
      return (
        <option key={pokedex.id} value={pokedex.id}>
          {pokedex.name}
        </option>
      );
    })
  ) : (
    <option>Loading Pokedex</option>
  );

  return (
    <div className="flex">
      <label>Select Pokedex:</label>
      <select
        name="pokedex"
        id="pokedex-select"
        value={currDex}
        onChange={(e) => changeDex(e.target.value)}
      >
        {dexOptions}
      </select>
    </div>
  );
}

function NumDisplaySelector({ numDisplay, changeNum }) {
  return (
    <div className="flex">
      <label>Number of Displayed Pokemon:</label>
      <input
        type="number"
        min="10"
        value={numDisplay}
        onChange={(e) => changeNum(e.target.value)}
      />
    </div>
  );
}

function TotalSelector({ pokemon, changeTotal }) {
  return (
    <div className="flex">
      <label>Total Pokemon:</label>
      <input
        type="number"
        min="10"
        value={pokemon.length}
        onChange={(e) => changeTotal(e.target.value)}
      />
    </div>
  );
}
