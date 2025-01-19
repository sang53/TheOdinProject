import { useEffect, useState } from "react";
import StartScreen from "./components/StartScreen";
import GameScreen from "./components/GameScreen";
import EndScreen from "./components/EndScreen";
import { APIHandler } from "./components/APIHandler";

const DEFAULT_DEX = 3;
const DEFAULT_POKENUM = 30;
const DEFAULT_DISPLAYNUM = 10;

function App() {
  const [gameStage, setGameStage] = useState(0);
  const [currDex, setCurrDex] = useState(false);
  const [pokemon, setPokemon] = useState([]);
  const [numDisplay, setNumDisplay] = useState(0);
  const [history, setHistory] = useState([]);
  const [hScore, setHScore] = useState(0);

  useEffect(() => {
    async function initPokedex() {
      await APIHandler.init();
      setCurrDex(DEFAULT_DEX);
      await APIHandler.loadDex(DEFAULT_DEX);
      // re-render with proper random pokemon ids once pokedex information is loaded
      setPokemon(APIHandler.getRandomIds(DEFAULT_POKENUM, DEFAULT_DEX));
      setNumDisplay(DEFAULT_DISPLAYNUM);
    }
    initPokedex();
  }, []);

  async function changeDex(idx) {
    await APIHandler.loadDex(idx);
    setCurrDex(idx);
    setPokemon(APIHandler.getRandomIds(pokemon.length, idx));
  }

  function changeTotal(num) {
    if (pokemon.length) setPokemon(APIHandler.getRandomIds(num, currDex));
  }

  function changeNum(num) {
    if (num <= pokemon.length) setNumDisplay(num);
    else setNumDisplay(pokemon.length);
  }

  function reshuffle() {
    setPokemon(APIHandler.getRandomIds(pokemon.length, currDex));
  }

  function progressGame() {
    setGameStage(gameStage + 1);
    switch (gameStage) {
      case 1:
        if (history.length > hScore) setHScore(history.length);
        break;
      case 2:
        setHistory([]);
        setGameStage(0);
        setPokemon(APIHandler.getRandomIds(pokemon.length, currDex));
    }
  }

  function addHistory(id) {
    if (!id) return setHistory([...history]);

    const numId = +id.slice(8);
    if (history.includes(numId)) progressGame();
    setHistory([...history, numId]);
  }

  const initProps = {
    changeTotal,
    changeNum,
    numDisplay,
    currDex,
    changeDex,
    pokemon,
    progressGame,
    reshuffle,
  };
  const gameProps = { pokemon, numDisplay, addHistory, history };
  const endProps = { history, hScore, progressGame };

  switch (gameStage) {
    case 0:
      return <StartScreen {...initProps} />;
    case 1:
      return <GameScreen {...gameProps} />;
    case 2:
      return <EndScreen {...endProps} />;
  }
}

export default App;
