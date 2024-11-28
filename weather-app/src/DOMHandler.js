import { unitSymbols } from "./UnitConverter";
import { addDays } from "date-fns";

export function updateData(data) {
  console.log(data);
  TodayHandler.updateCurrentConditions(data.currentConditions);
  ForecastHandler.updateForecast(data.days);
}

const TodayHandler = (function () {
  const CURRENT_CONTAINER = document.querySelector("#current-conditions");
  const CONDITIONS_DIV = document.querySelector("#conditions");
  const TEMP_DIV = document.querySelector("#temp");
  const FEELS_DIV = document.querySelector("#feels");
  const HUMID_DIV = document.querySelector("#humid");
  const PRECIP_DIV = document.querySelector("#precip");

  function updateCurrentConditions(currentConditions) {
    TEMP_DIV.textContent = currentConditions.temp + UnitHandler.tempSuffix;
    FEELS_DIV.textContent =
      "Feels Like: " + currentConditions.feelslike + UnitHandler.tempSuffix;
    HUMID_DIV.textContent = "Humidity: " + currentConditions.humidity + "%";
    PRECIP_DIV.textContent = `Precipitation: ${currentConditions.precip + unitSymbols[UnitHandler.getUnits()][1]} @ ${currentConditions.precipprob}%`;
    CONDITIONS_DIV.textContent = currentConditions.conditions;

    CURRENT_CONTAINER.style.backgroundColor = ForecastHandler.getBGColour(
      currentConditions.conditions,
    );
  }

  return { updateCurrentConditions };
})();

const ForecastHandler = (function () {
  const FORECAST_CONTAINER = document.querySelector("#forecast-container");
  const TEMPLATE_GRID = document.querySelector("#template-grid");
  const TEMPLATE_CELL = document.querySelector("#template-cell");
  let forecastDiv; // currently displayed forecast div

  const dayNames = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

  function updateForecast(daysArray) {
    newForecastDiv();

    let forecastDate = new Date();

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
    if (forecastDiv) forecastDiv.remove();
    forecastDiv = TEMPLATE_GRID.cloneNode();
    forecastDiv.classList.toggle("hidden");
    FORECAST_CONTAINER.appendChild(forecastDiv);
  }

  function createCell(conditions, temp, feels, humid, precip, precipP, day) {
    const cell = TEMPLATE_CELL.cloneNode();
    cell.textContent = `${day} - T: ${temp + UnitHandler.tempSuffix} F: ${feels + UnitHandler.tempSuffix} H: ${humid}% P: ${precip + unitSymbols[UnitHandler.getUnits()][1]}, ${precipP}%`;
    cell.classList.toggle("hidden");
    cell.style.backgroundColor = getBGColour(conditions);
    forecastDiv.appendChild(cell);
  }

  function getBGColour(conditions) {
    if (conditions.includes("Rain")) return "var(--rain)";
    else if (conditions.includes("Overcast") || conditions.includes("cloud"))
      return "var(--cloudy)";
    else if (conditions.includes("Clear")) return "var(--clear)";
  }

  return { updateForecast, getBGColour };
})();

export const UnitHandler = (function () {
  let units = "metric";
  let tempSuffix;

  updateTempSuffix();

  function changeUnits(newUnits) {
    if (units === newUnits) return;
    units = newUnits;
    updateTempSuffix();
  }

  function getUnits() {
    return units;
  }

  function updateTempSuffix() {
    tempSuffix = String.fromCharCode(176) + unitSymbols[units][0];
  }

  return { changeUnits, getUnits, tempSuffix };
})();
