export function jsonify(project) {
  return JSON.stringify(project, replacer);
}

export function unjsonify(projectString) {
  return JSON.parse(projectString, reviver);
}

function replacer(key, data) {
  if (key === "tasks") return Array.from(data.entries());
  else return data;
}

function reviver(key, data) {
  switch (key) {
    case "tasks":
      return new Map(data);
    case "deadline":
      return new Date(data);
    default:
      return data;
  }
}
