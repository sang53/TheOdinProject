import { unitSymbols } from "./UnitConverter";
import { addDays } from "date-fns";

export function updateData(data) {
  TodayHandler.updateCurrentConditions(data.currentConditions);
  ForecastHandler.updateForecast(data.days);
}

const TodayHandler = (function () {
  const CONDITIONS_DIV = document.querySelector("#conditions");
  const TEMP_DIV = document.querySelector("#temp");
  const FEELS_DIV = document.querySelector("#feels");
  const HUMID_DIV = document.querySelector("#humid");
  const PRECIP_DIV = document.querySelector("#precip");

  function updateCurrentConditions(currentConditions) {
    TEMP_DIV.textContent =
      "Current: " + currentConditions.temp + UnitHandler.tempSuffix;
    FEELS_DIV.textContent =
      "Feels Like: " + currentConditions.feelslike + UnitHandler.tempSuffix;
    HUMID_DIV.textContent = "Humidity: " + currentConditions.humidity + "%";
    PRECIP_DIV.textContent = `Precipitation: ${currentConditions.precip + unitSymbols[UnitHandler.getUnits()][1]} ${currentConditions.precipprob}%`;
    CONDITIONS_DIV.textContent = currentConditions.conditions;
  }

  return { updateCurrentConditions };
})();

const ForecastHandler = (function () {
  const CONTENT_DIV = document.querySelector(".content");
  const TEMPLATE_GRID = document.querySelector(".display");
  const TEMPLATE_CELL = document.querySelector(".cell");
  let forecastDiv; // currently displayed forecast div

  const dayNames = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

  function updateForecast(daysArray) {
    newForecastDiv();

    let forecastDate = new Date();

    for (let i in daysArray) {
      forecastDate = addDays(forecastDate, 1);
      createCell(
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
    CONTENT_DIV.appendChild(forecastDiv);
  }

  function createCell(temp, feels, humid, precip, precipP, day) {
    const cell = TEMPLATE_CELL.cloneNode();
    cell.textContent = `${day} - T: ${temp + UnitHandler.tempSuffix} F: ${feels + UnitHandler.tempSuffix} H: ${humid}% P: ${precip + unitSymbols[UnitHandler.getUnits()][1]} ${precipP}%`;
    cell.classList.toggle("hidden");
    forecastDiv.appendChild(cell);
  }

  return { updateForecast };
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
