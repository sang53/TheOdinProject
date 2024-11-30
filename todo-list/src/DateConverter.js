import { formatDistance, format, compareAsc } from "date-fns";

const DATEFORMAT = "dd/MM/yyyy";

export function convertTimeToString(dateobj) {
  return formatDistance(new Date(), dateobj);
}

export function convertDate(date) {
  return format(date, DATEFORMAT);
}

export function getInputMinDate() {
  return format(new Date(), "yyyy-MM-dd");
}

export function sortAscDate(projects) {
  projects.sort((project1, project2) =>
    compareAsc(project1.deadline, project2.deadline),
  );
}

export function getDateObj(dateString, timeString) {
  const dateObj = new Date(dateString);
  const [hour, min] = timeString.split(":").map((element) => parseInt(element));
  dateObj.setHours(hour, min);
  return dateObj;
}
