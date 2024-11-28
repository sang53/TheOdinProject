import { addDays, format } from "date-fns";

const FREEKEY = "AB3WEYEUB5K3PCYCREEW3X4XU";

const INTERVAL_DAYS = 5;
const DATE_FORMAT = "yyyy-MM-dd";

const fromDate = new Date();
const toDate = addDays(fromDate, INTERVAL_DAYS - 1); // subtract 1 - adding full 5 days results in 6 days

export async function getData(cityName, units) {
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cityName}/${format(fromDate, DATE_FORMAT)}/${format(toDate, DATE_FORMAT)}?key=${FREEKEY}&unitGroup=${units}`,
      { mode: "cors" },
    );

    return await validateData(response);
  } catch (error) {
    console.log(error);
  }
}

async function validateData(response) {
  if (!response.ok) throw new Error("Status Code: " + response.status);
  return await response.json();
}
