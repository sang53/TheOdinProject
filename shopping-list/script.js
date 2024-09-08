const inputBox = document.querySelector(".inputBox");
const inputBtn = document.querySelector(".inputBtn");
const shopList = document.querySelector(".shopList");

function addItem() {
    let newList = document.createElement("li");
    newList.textContent = inputBox.value + " ";
    shopList.appendChild(newList);

    let newBtn = document.createElement("button");
    newBtn.setAttribute("class", "deleteBtn");
    newBtn.textContent = "Remove item";
    newList.appendChild(newBtn);

    newBtn.addEventListener("click", deleteList);
    inputBox.value = "";
    inputBox.focus();
}

function deleteList(e) {
    e.target.parentNode.remove();
}

inputBtn.addEventListener("click", addItem);
inputBox.addEventListener("keydown", function (e) {
    if (e.key == "Enter") addItem();
});