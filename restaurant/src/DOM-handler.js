export function createElement(tag = "div", classes = [], text = "") {
  const element = document.createElement(tag);
  element.className = classes.join(" ");
  element.innerText = text;
  return element;
}
