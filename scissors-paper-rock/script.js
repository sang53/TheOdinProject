const NUM_ROUNDS = 5;
const convertToStr = ["Scissors", "Paper", "Rock", "Scissors"];
const scores = document.querySelectorAll(".score");
const textOutput = document.querySelector("#round");
const playButton = document.querySelector("#play");
const divButtons = document.querySelector("#buttons");

var playerScore = 0;
var computerScore = 0;
var gameStarted = false;

playButton.addEventListener("click", playGame);
divButtons.addEventListener("click", playRound);

function playRound(e) {
    if (!gameStarted || e.target === divButtons) return;
    let response = Math.floor((Math.random() * 3)) + 1;
    generateWinner(e.target.id, response);
}

function generateWinner(input, response) {
    let outputString = "You Played: " + convertToStr[input] + "\nThe Computer Played: " + convertToStr[response] + "\n";
    if (convertToStr[input] === convertToStr[response]) outputString += "It's a Draw!";
    else if (input == response - 1) {
        outputString += "You Win!";
        playerScore++;
        updateScores();
    }
    else {
        outputString += "You Lose!";
        computerScore++;
        updateScores();
    }
    textOutput.innerText = outputString;
}

function updateScores() {
    scores[0].textContent = playerScore;
    scores[1].textContent = computerScore;
    if (playerScore === 5) {
        scores[0].textContent += " Win!";
        endGame();
    }
    else if (computerScore === 5) {
        scores[1].textContent += " Win!";
        endGame();
    }
}

function resetScore(element) {
    element.textContent = 0;
}

function playGame() {
    playerScore = 0;
    computerScore = 0;
    scores.forEach(resetScore);
    playButton.textContent = "Reset Game";
    gameStarted = true;
}

function endGame() {
    gameStarted = false;
    playButton.textContent = "Play Again!"
}