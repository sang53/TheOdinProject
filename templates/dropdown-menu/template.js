document.addEventListener("click", clickDropDown);

function clickDropDown(event) {
  if (event.target.className === "drop-down-click-button") {
    const DropDownButton = document.querySelector(".drop-down-click-content");
    DropDownButton.classList.toggle("hidden");
  }
}
