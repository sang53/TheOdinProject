import { unitSymbols, dayNames } from "./UnitConverter";
import { addDays } from "date-fns";

// main function to handle fetched data
export function updateData(data) {
  TodayHandler.updateCurrentConditions(data.currentConditions);
  ForecastHandler.updateForecast(data.days);
}

// displays current conditions in div#current-conditions
const TodayHandler = (function () {
  const CURRENT_CONTAINER = document.querySelector("#current-conditions");

  const CONDITIONS_DIV = document.querySelector("#conditions");
  const TEMP_DIV = document.querySelector("#temp");
  const FEELS_DIV = document.querySelector("#feels");
  const HUMID_DIV = document.querySelector("#humid");
  const PRECIP_DIV = document.querySelector("#precip");

  function updateCurrentConditions(currentConditions) {
    TEMP_DIV.textContent = currentConditions.temp + UnitHandler.getTempSuffix();
    FEELS_DIV.textContent =
      "Feels Like: " +
      currentConditions.feelslike +
      UnitHandler.getTempSuffix();
    HUMID_DIV.textContent = "Humidity: " + currentConditions.humidity + "%";
    PRECIP_DIV.textContent = `Precipitation: ${currentConditions.precip + UnitHandler.getPrecipSuffix()} @ ${currentConditions.precipprob}%`;
    CONDITIONS_DIV.textContent = currentConditions.conditions;

    CURRENT_CONTAINER.style.backgroundColor = ForecastHandler.getBGColour(
      currentConditions.conditions,
    ); // change container bg colour according to reported conditions
  }

  return { updateCurrentConditions };
})();

// displays forecast as a grid in div#forecast-container
const ForecastHandler = (function () {
  const FORECAST_CONTAINER = document.querySelector("#forecast-container");

  // templates in HTML have "hidden" class
  const TEMPLATE_GRID = document.querySelector("#template-grid");
  const TEMPLATE_CELL = document.querySelector("#template-cell");

  let forecastDiv; // reference to currently displayed forecast div

  function updateForecast(daysArray) {
    newForecastDiv();

    let forecastDate = new Date();

    // create cells w/ data for each day of data & append to the displayed grid
    for (let i in daysArray) {
      forecastDate = addDays(forecastDate, 1);
      createCell(
        daysArray[i].conditions,
        daysArray[i].temp,
        daysArray[i].feelslike,
        daysArray[i].humidity,
        daysArray[i].precip,
        daysArray[i].precipprob,
        dayNames[forecastDate.getDay()],
      );
    }
  }

  function newForecastDiv() {
    if (forecastDiv) forecastDiv.remove(); // remove currently displayed forecast if it exists

    forecastDiv = TEMPLATE_GRID.cloneNode();
    forecastDiv.classList.toggle("hidden");
    FORECAST_CONTAINER.appendChild(forecastDiv);
  }

  function createCell(conditions, temp, feels, humid, precip, precipP, day) {
    const cell = TEMPLATE_CELL.cloneNode();
    cell.textContent = `${day} - T: ${temp + UnitHandler.getTempSuffix()} F: ${feels + UnitHandler.getTempSuffix()} H: ${humid}% P: ${precip + UnitHandler.getPrecipSuffix()}, ${precipP}%`;
    cell.classList.toggle("hidden");
    cell.style.backgroundColor = getBGColour(conditions); // change cell bg colour according to reported conditions
    forecastDiv.appendChild(cell);
  }

  // colours for each condition saved in ./style.css
  function getBGColour(conditions) {
    if (conditions.includes("Rain")) return "var(--rain)";
    else if (conditions.includes("Overcast") || conditions.includes("cloud"))
      return "var(--cloudy)";
    else if (conditions.includes("Clear")) return "var(--clear)";
  }

  return { updateForecast, getBGColour };
})();

// handle changes in units & the degrees suffix according to units
export const UnitHandler = (function () {
  let units = "metric";
  let tempSuffix;
  let precipSuffix;

  updateSuffixes();

  function changeUnits(newUnits) {
    if (units === newUnits) return;
    units = newUnits;
    updateSuffixes();
  }

  function getUnits() {
    return units;
  }

  function updateSuffixes() {
    tempSuffix = String.fromCharCode(176) + unitSymbols[units][0]; //charcode 176 = degrees symbol
    precipSuffix = unitSymbols[units][1];
  }

  function getTempSuffix() {
    return tempSuffix;
  }

  function getPrecipSuffix() {
    return precipSuffix;
  }

  return { changeUnits, getTempSuffix, getPrecipSuffix, getUnits };
})();
