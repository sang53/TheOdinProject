let resolution = 16;
let clicking = false;

const contentDiv = document.querySelector("#content");
const buttonDiv = document.querySelector("div.center");

contentDiv.addEventListener("mousedown", toggleClick);
contentDiv.addEventListener("mouseup", toggleClick);
buttonDiv.addEventListener("click", buttonPress);
contentDiv.addEventListener("mouseover", addColor);

function toggleClick(e) {
    e.preventDefault();
    clicking = !clicking;
}

function createCell() {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.style.backgroundColor = generateColor();
    cell.style.opacity = 0;
    return cell;
}

function createRow() {
    const row = document.createElement("div");
    row.classList.add("row");
    return row;
}

// create resolution x resolution grid
function createGrid() {
    for (let i = 0; i < resolution; i++) {
        const row = createRow();
        contentDiv.appendChild(row);
        for (let j = 0; j < resolution; j++) {
            const cell = createCell();
            row.appendChild(cell);
        }
    }
    adjustGridToSquare();
}

// render square cells by squaring container div
function adjustGridToSquare() {
    let difference = (contentDiv.offsetWidth - contentDiv.offsetHeight) / 2;
    contentDiv.style.padding = difference > 0 ? `0px ${difference}px` : `${-difference}px 0px`;
}

// decrease opacity on mouseover, by a higher value if currently holding mouse button
function addColor(event){
    if (event.target === contentDiv) return;
    (clicking) ? changeOpacity(event.target, 0.3) : changeOpacity(event.target, 0.1);
}

// randomise colour of each cell
function generateColor() {
    const randomColor = Array.from({ length: 3 }, () => Math.floor(Math.random() * 256)).join(',');
    return `rgb(${randomColor})`;
}

function changeOpacity(element, amount) {
    element.style.opacity = parseFloat(element.style.opacity) + amount;
}

function buttonPress(event) {
    if (event.target.id === "change-num") {
        let input;
        do {
            input = parseInt(prompt("Please enter a new resolution from 1 to 100", resolution));
        } while (isNaN(input) || input < 1 || input > 100); // validate user input
        resolution = input;
        resetGrid();
    }
    else if (event.target.id === "reset") resetGrid();
}

function resetGrid() {
    contentDiv.innerHTML = "";
    createGrid();
}

// initialise webpage with 16x16 grid
createGrid();