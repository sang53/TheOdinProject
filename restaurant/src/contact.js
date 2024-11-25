import { createElement } from "./DOM-handler.js";

const CONTENTDIV = document.querySelector("#content");
const INFORMATION =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.";
const PHONENUMBER = "9237 2934";
const EMAIL = "example@123.com";
const ADDRESS = "3/54 WhoKnows St,\n Darwin, NT 2473";

export function addContacts() {
  addHeader();
  addContent();
  addFooter();
}

function addHeader() {
  const parentDiv = createElement();
  parentDiv.appendChild(createElement("h1", ["title"], "Contact Details"));
  appendToContent(parentDiv);
}

function addContent() {
  const parentDiv = createElement("div", ["main-content"]);
  appendToContent(parentDiv);
  parentDiv.appendChild(
    createElement("div", ["contact-sentence"], INFORMATION),
  );
  const contactDiv = createElement("div", ["grid", "contact-div"]);
  contactDiv.appendChild(
    createElement("div", ["phone-number"], `Phone Number: ${PHONENUMBER}`),
  );
  contactDiv.appendChild(createElement("div", ["email"], `Email: ${EMAIL}`));
  contactDiv.appendChild(
    createElement("div", ["address"], `Address: ${ADDRESS}`),
  );
  parentDiv.appendChild(contactDiv);
}

function addFooter() {
  const parentDiv = createElement();
  parentDiv.appendChild(createElement("em", [], "Thank you for visiting!"));
  appendToContent(parentDiv);
}

function appendToContent(element) {
  CONTENTDIV.appendChild(element);
}
