const Board = (function () {
  // private
  let boardState = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];
  let moveHistory = [];
  let moveNumber = 0;

  function updateBoard(x, y, playerNumber = 0) {
    boardState[y][x] = playerNumber;
  }

  // public
  function addSquare(x, y, playerNumber) {
    updateBoard(x, y, playerNumber);
    moveHistory.push([x, y]);
    moveNumber++;
  }

  function undoMove() {
    let [x, y] = moveHistory.pop();
    updateBoard(x, y);
    moveNumber--;
    return [x, y];
  }

  function reset() {
    boardState = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];
    moveHistory = [];
    moveNumber = 0;
  }

  function checkWin(playerNumber) {
    [x, y] = moveHistory.at(-1);
    let column = 0;
    let row = 0;
    let diagPos = 0;
    let diagNeg = 0;

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (boardState[i][j] === playerNumber) {
          if (j === x) column++;
          if (i === y) row++;
          if (i === j) diagNeg++;
          if (i + j === 2) diagPos++;
        }
      }
    }

    return column === 3 || row === 3 || diagNeg === 3 || diagPos === 3;
  }

  function getMoveNumber() {
    return moveNumber;
  }

  return { getMoveNumber, addSquare, undoMove, reset, checkWin };
})();

DisplayController = (function () {
  //private
  const BUTTONS = {
    startGame: document.querySelector(".dialog-open"),
    playAgain: document.querySelector(".play-again"),
  };
  const CELLS = Array.from(document.querySelector(".board").children);

  const TURNINDICATOR = document.querySelector(".turn-indicator").firstChild;
  const PLAYER1SCORE = document.querySelector(".player1-score");
  const PLAYER2SCORE = document.querySelector(".player2-score");

  // public
  function makeCellsSquare() {
    difference = (CELLS[0].offsetWidth - CELLS[0].offsetHeight) * 3;
    if (difference >= 0)
      document.querySelector("body").style.padding = `0px ${difference / 2}px`;
    else {
      document.querySelector("body").style.padding = `${-difference / 2}px 0px`;
    }
  }

  function placeNames(player1Name, player2Name) {
    PLAYER1SCORE.previousElementSibling.textContent = player1Name + ": ";
    PLAYER2SCORE.previousElementSibling.textContent = player2Name + ": ";
  }

  function updateTurn(playerName) {
    TURNINDICATOR.textContent = `${playerName}'s Turn!`;
  }

  function updateSquare(cellNumber, playerSymbol) {
    CELLS[cellNumber].classList.toggle(playerSymbol);
  }

  function displayWinner(playerName) {
    TURNINDICATOR.textContent = `${playerName} Wins!`;
  }

  function displayDraw() {
    TURNINDICATOR.textContent = `It's a Draw!`;
  }

  function updateScore(playerScore, playerNumber) {
    if (playerNumber === 1) PLAYER1SCORE.textContent = `Score: ${playerScore}`;
    else PLAYER2SCORE.textContent = `Score: ${playerScore}`;
  }

  function resetBoard() {
    for (let cell of CELLS) {
      cell.className = "cell";
    }
  }

  function resetScores() {
    PLAYER1SCORE.textContent = "Score: 0";
    PLAYER2SCORE.textContent = "Score: 0";
  }

  function toggleButton(property) {
    BUTTONS[property].classList.toggle("hidden");
  }

  return {
    makeCellsSquare,
    placeNames,
    updateTurn,
    updateSquare,
    displayWinner,
    displayDraw,
    updateScore,
    resetBoard,
    resetScores,
    toggleButton,
  };
})();

EventController = (function () {
  //private
  document.addEventListener("load", DisplayController.makeCellsSquare());
  document.addEventListener("click", handleClickEvent);

  const DIALOG = document.querySelector("dialog");
  const PLAYER1INPUT = document.querySelector(".input-player-name1");
  const PLAYER2INPUT = document.querySelector(".input-player-name2");

  let player1, player2, playerTurn;
  let playing = false;

  function handleClickEvent(event) {
    switch (event.target.className) {
      case "dialog-open":
        DIALOG.showModal();
        break;
      case "dialog-close":
        PLAYER1INPUT.value = "";
        PLAYER2INPUT.value = "";
        DIALOG.close();
        break;
      case "dialog-confirm":
        startGame();
        break;
      case "cell":
        clickSquare(event);
        break;
      case "reset":
        resetAll();
        break;
      case "undo":
        clickUndo();
        break;
      case "play-again":
        clickPlayAgain();
        break;
    }
  }

  function startGame() {
    if (PLAYER1INPUT.value && PLAYER2INPUT.value) {
      player1 = new Player(PLAYER1INPUT.value, "circle", 1);
      player2 = new Player(PLAYER2INPUT.value, "cross", 2);
      playerTurn = player1;
      playing = true;
      DisplayController.toggleButton("startGame");
      DisplayController.updateTurn(playerTurn.name);
      DisplayController.placeNames(player1.name, player2.name);
      DIALOG.close();
    }
  }

  function convertIdCoords(...args) {
    if (arguments.length == 2) return arguments[1] * 3 + arguments[0];
    else return [arguments[0] % 3, Math.floor(arguments[0] / 3)];
  }

  function togglePlayerTurn() {
    playerTurn = playerTurn === player1 ? player2 : player1;
  }

  function clickSquare(event) {
    if (playing) {
      cellNumber = +event.target.id.at(-1);
      [x, y] = convertIdCoords(cellNumber);

      Board.addSquare(x, y, playerTurn.number);
      DisplayController.updateSquare(cellNumber, playerTurn.symbol);

      if (Board.checkWin(playerTurn.number)) {
        playing = false;
        DisplayController.displayWinner(playerTurn.name);
        DisplayController.updateScore(++playerTurn.score, playerTurn.number);
        DisplayController.toggleButton("playAgain");
        togglePlayerTurn();
      } else {
        togglePlayerTurn();
        if (Board.getMoveNumber() === 9) {
          DisplayController.displayDraw();
          playing = false;
          DisplayController.toggleButton("playAgain");
        } else DisplayController.updateTurn(playerTurn.name);
      }
    }
  }

  function resetAll() {
    Board.reset();
    DisplayController.resetBoard();
    DisplayController.resetScores();
    DisplayController.updateTurn(playerTurn.name);
    if (!playing) {
      playing = true;
      DisplayController.toggleButton("playAgain");
    }
  }

  function clickUndo() {
    if (Board.getMoveNumber()) {
      togglePlayerTurn();
      if (!playing) {
        if (Board.checkWin(playerTurn.number))
          DisplayController.updateScore(--playerTurn.score, playerTurn.number);
        DisplayController.toggleButton("playAgain");
        playing = true;
      }
      DisplayController.updateSquare(
        convertIdCoords(...Board.undoMove()),
        playerTurn.symbol,
      );
      DisplayController.updateTurn(playerTurn.name);
    }
  }

  function clickPlayAgain() {
    Board.reset();
    playing = true;
    DisplayController.resetBoard();
    DisplayController.toggleButton("playAgain");
    DisplayController.updateTurn(playerTurn.name);
  }
  return {};
})();

function Player(name, symbol, number) {
  this.name = name;
  this.symbol = symbol;
  this.score = 0;
  this.number = number;
}
