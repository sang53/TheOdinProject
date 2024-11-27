import { convertTemp, tempSymbol } from "./tempConverter";

const CONTENT_DIV = document.querySelector(".content");
const CONDITIONS_DIV = document.querySelector("#conditions");
const TEMP_DIV = document.querySelector("#temp");
const FEELS_DIV = document.querySelector("#feels");
const HUMID_DIV = document.querySelector("#humid");
const PRECIP_DIV = document.querySelector("#precip");
const TEMPLATE_GRID = document.querySelector(".display");
const TEMPLATE_CELL = document.querySelector(".cell");
const SEARCHBAR = document.querySelector("#city-name");

let displayGrid;
let units = "metric";
let tempSuffix = getTempSuffix();
let currentTemp, feelsTemp;

export function getCityName() {
  return SEARCHBAR.value;
}

export function getUnits() {
  return units;
}

export function changeUnits(newUnits) {
  if (units === newUnits) return;

  currentTemp = convertTemp(currentTemp, units, newUnits);
  feelsTemp = convertTemp(feelsTemp, units, newUnits);
  units = newUnits;

  tempSuffix = getTempSuffix();
  updateTempDisplay();
}

function updateTempDisplay() {
  TEMP_DIV.textContent = "Current: " + currentTemp + tempSuffix;
  FEELS_DIV.textContent = "Feels Like: " + feelsTemp + tempSuffix;
}

function getTempSuffix() {
  return String.fromCharCode(176) + tempSymbol[units][0];
}

export function updateData(data) {
  updateCurrentConditions(data.currentConditions);
  newDisplayDiv();
  addCellsToDisplay(data.days);
}

function updateCurrentConditions(currentConditions) {
  currentTemp = currentConditions.temp;
  feelsTemp = currentConditions.feelslike;
  updateTempDisplay();

  HUMID_DIV.textContent = "Humidity: " + currentConditions.humidity + "%";
  PRECIP_DIV.textContent = `Precipitation: ${currentConditions.precip + tempSymbol[units][1]} ${currentConditions.precipprob}%`;
  CONDITIONS_DIV.textContent = currentConditions.conditions;
}

function newDisplayDiv() {
  if (displayGrid) displayGrid.remove();
  displayGrid = TEMPLATE_GRID.cloneNode();
  displayGrid.classList.toggle("hidden");
  CONTENT_DIV.appendChild(displayGrid);
}

function addCellsToDisplay(daysArray) {
  daysArray.forEach((element) =>
    createCell(
      element.temp,
      element.feelslike,
      element.humidity,
      element.precip,
      element.precipprob,
    ),
  );
}

function createCell(temp, feels, humid, precip, precipP) {
  const cell = TEMPLATE_CELL.cloneNode();
  cell.textContent = `T: ${temp + tempSuffix} F: ${feels + tempSuffix} H: ${humid}% P: ${precip + tempSymbol[units][1]} ${precipP}%`;
  cell.classList.toggle("hidden");
  displayGrid.appendChild(cell);
}
