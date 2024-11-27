export function convertTemp(temp, units, newUnits) {
  const metricTemp = toMetric(temp, units);

  if (newUnits === "uk" || newUnits === "metric") return metricTemp;
  else return fromMetric(metricTemp, newUnits);
}

export const tempSymbol = {
  metric: ["C", "cm"],
  uk: ["C", "in"],
  us: ["F", "in"],
  base: ["K", "cm"],
};

function toMetric(temp, units) {
  if (units === "base") return currentTemp - 273.15;
  else return ((temp - 32) * 5) / 9;
}

function fromMetric(temp, newUnits) {
  if (newUnits === "base") return temp + 273.15;
  else return (temp * 9) / 5 + 32;
}
