export function makeElement(tag, attributeArray, text = "") {
  const element = document.createElement(tag);
  attributeArray.forEach(([attribute, value]) => {
    element.setAttribute(attribute, value);
  });
  element.innerText = text;
  return element;
}

export function toggleClass(element, className) {
  element.classList.toggle(className);
  return element;
}
