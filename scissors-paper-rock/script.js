const NUM_ROUNDS = 5;
const COMPARE = ["scissors", "rock", "paper", "scissors"]
let playerScore = 0;
let computerScore = 0;

function playRound() {
    let input = getUserInput();
    let response = Math.floor((Math.random() * 3)) + 1;
    generateWinner(input, response);
}

function getUserInput() {
    let input;
    do {
        input = prompt("Please enter Scissors, Paper or Rock")
        input = input.toLowerCase();
        if (input === "scissor" || input === "scissors") {
            return "scissors"
        }
    } while (input != "rock" && input != "paper");
    return input;
}

function generateWinner(input, response) {
    let output = "The computer played " + COMPARE[response] + ".\n";
    if (input === COMPARE[response]) {
        output = output + "It's a draw!\n";
    }
    else if (input === COMPARE[response - 1]) {
        output = output + "You Lose!\n";
        computerScore++;
    }
    else {
        output = output + "You Win!\n";
        playerScore++;
    }
    alert(output.concat("Scores:\nPlayer - ", playerScore, "\nComputer - ", computerScore))
    return;
}
function playGame() {
    alert("Play 5 rounds of scissors, paper, rock!")
    for(i = 0; i < NUM_ROUNDS; i++) {
        playRound();
    }
    if (playerScore > computerScore) {
        alert("You win the game!");
    }
    else if (playerScore < computerScore) {
        alert("You lose the game...");
    }
    else {
        alert("The game ends in a draw.");
    }
    alert("Thanks for playing!");
}

playGame();