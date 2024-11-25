import "./style.css";

const FORM = document.querySelector("form");

FORM.addEventListener("submit", submitHandler);
FORM.addEventListener("focusout", focusOutHandler);

function focusOutHandler(event) {
  if (event.target.id === "password-confirm") checkPassword(event.target);
  else if (!event.target.checkValidity()) errorMessage(event.target);
}

function submitHandler(event) {
  if (!FORM.checkValidity()) FORM.reportValidity();
  else alert("Valid!");
  event.preventDefault();
}

function errorMessage(inputElement) {
  if (inputElement.validity.valueMssing)
    inputElement.setCustomValidity("Please Enter a Value");
  else if (inputElement.validity.typeMismatch)
    inputElement.setCustomValidity(
      `Please Enter Valid ${inputElement.id.at(0).toUpperCase() + inputElement.id.slice(1)}`,
    );
  else if (
    inputElement.validity.rangeOverflow ||
    inputElement.validity.rangeUnderflow
  )
    inputElement.setCustomValidity("Please Enter Valid PostCode");
  else if (inputElement.validity.tooShort)
    inputElement.setCustomValidity("Password <6 characters");
  else inputElement.setCustomValidity("");
}

function checkPassword(inputElement) {
  const passwordElement = FORM.querySelector("#password");
  if (inputElement.value !== passwordElement.value)
    inputElement.setCustomValidity("Passwords Not Matching");
  else inputElement.setCustomValidity("");
}
