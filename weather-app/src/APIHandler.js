const FREEKEY = "AB3WEYEUB5K3PCYCREEW3X4XU";

export async function getData(cityName, units) {
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cityName}?key=${FREEKEY}&unitGroup=${units}`,
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
