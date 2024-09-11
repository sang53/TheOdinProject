var cells = [];
var rows = [];
var resolution = 16;
const contentDiv = document.querySelector("#content");
const buttonDiv = document.querySelector("div.center");

var clicking = false;

contentDiv.addEventListener("mousedown", toggleClick);
contentDiv.addEventListener("mouseup", toggleClick);
buttonDiv.addEventListener("click", buttonpress);
contentDiv.addEventListener("mouseover", addColor);

function toggleClick(e) {
    e.preventDefault();
    clicking = !clicking;
    e.stopPropagation();
}

function makeCell() {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.style.backgroundColor = generateColor();
    cells.push(cell);
    return cell;
}

function makeRow() {
    const div = document.createElement("div");
    div.classList.add("row");
    rows.push(div);
    return div;
}

function makeGrid() {
    for (let i = 0; i < resolution; i++) {
        const row = makeRow();
        contentDiv.appendChild(row);
        for (let j = 0; j < resolution; j++) {
            const cell = makeCell();
            row.appendChild(cell);
        }
    }
    makeSquare();
}

function makeSquare() {
    let difference = (contentDiv.offsetWidth - contentDiv.offsetHeight) / 2;
    if (difference > 0) contentDiv.style.padding = "0px " + difference + "px";
    else contentDiv.style.padding = difference + "px 0px";
}

function addColor(event){
    if (event.target === contentDiv) return;
    (clicking) ? changeOpacity(event.target, 0.3) : changeOpacity(event.target, 0.1);
}

function generateColor() {
    color = "rgba("
    for (let i = 0; i < 3; i++) color += Math.floor(Math.random() * 256) + ",";
    color += "0)"
    return color;
}

function changeOpacity(element, amount) {
    color = element.style.backgroundColor;
    if (color.slice(0, 4) === "rgba") {
        temp = color.split(",");
        opacity = temp.pop().slice(0, -1);
        opacity = +opacity + amount + ")";
        temp.push(opacity);
        element.style.backgroundColor = temp.join(",");
    }
}

function buttonpress(event) {
    if (event.target.id === "change-num") {
        let input;
        do {
            input = parseInt(prompt("Please enter a new resolution from 1 to 100", resolution));
            console.log(input);
        } while (input === NaN || !(input <= 100 && input >= 1));
        resolution = input;
        reset();
    }
    else if (event.target.id === "reset") reset();
}

function reset() {
    cells.forEach((element) => element.remove());
    cells = [];
    rows.forEach((element) => element.remove());
    rows = [];
    makeGrid();
}

makeGrid();