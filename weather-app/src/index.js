import "./style.css";

import { getData } from "./APIHandler";
import { getUnits, updateData, getCityName } from "./DOMHandler";

function search() {
  getData(getCityName(), getUnits()).then(updateData);
}

search();
