const savedBooks = [
  {
    title: "The Fellowship of the Ring",
    author: "J. R. R. Tolkien",
    year: "1954",
    fiction: "Fiction",
    genre: "Fantasy",
    series: "Lord of the Rings",
    pages: "125",
    score: "9/10",
    price: "20",
    read: true,
  },
  {
    title: "1984",
    author: "George Orwell",
    year: "1949",
    fiction: "Fiction",
    genre: "Sci-Fi",
    series: "N/A",
    pages: "67",
    score: "8/10",
    price: "25",
    read: true,
  },
];
const myLibrary = new Map();
const CONTENT = document.querySelector(".content");
const BOOK_TEMPLATE = CONTENT.querySelector(".book-template");
const DIALOG = document.querySelector("dialog");
const INPUTFORM = DIALOG.querySelector(".form");

initialiseLibrary();

document.addEventListener("click", handleClickEvent);

function Book(
  title = "N/A",
  author = "N/A",
  year = "N/A",
  fiction = "Fiction",
  genre = "N/A",
  series = "N/A",
  pages = "N/A",
  score = "N/A",
  price = "N/A",
  read = false,
) {
  this.title = title;
  this.author = author;
  this.year = year;
  this.fiction = fiction;
  this.genre = genre;
  this.series = series;
  this.pages = pages;
  this.score = score;
  this.price = price;
  this.read = read;
}

function initialiseLibrary() {
  savedBooks.forEach(addBookToPage);
}

function addBookToPage(book) {
  const node = BOOK_TEMPLATE.cloneNode(true);

  for ([key, value] of Object.entries(book)) {
    childNode = node.querySelector(`.${key}`);

    if (key === "read") {
      if (value === true)
        childNode.querySelector(".book-read-checkbox").checked = true;
    } else {
      childNode.innerText += value;
    }
  }

  node.classList.toggle("hidden");
  CONTENT.appendChild(node);
  myLibrary.set(node, book);
}

function handleClickEvent(event) {
  const eventClass = event.target.getAttribute("class");
  switch (eventClass) {
    case "checkbox_hidden":
      toggleChecked(getBookNode(event.target.parentElement));
      break;
    case "remove-book":
      removeBook(getBookNode(event.target.parentElement));
      break;
    case "add-book":
      DIALOG.showModal();
      break;
    case "dialog-confirm":
      validateInput();
      break;
    case "dialog-close":
      closeDialog();
      break;
  }
  event.stopPropagation();
}

function getBookNode(node) {
  while (node.className !== "book-template") {
    node = node.parentElement;
  }
  return node;
}

function toggleChecked(node) {
  myLibrary.get(node).read = !myLibrary.get(node).read;
}

function removeBook(node) {
  myLibrary.delete(node);
  CONTENT.removeChild(node);
}

function createBook() {
  const book = new Book();
  fillBook(book);
  addBookToPage(book);
}

function fillBook(book) {
  const dataNodes = document.querySelector(".form").children;
  Array.from(dataNodes).forEach(getData, book);
}

function getData(node) {
  if (node.className === "flex") {
    if (node.querySelector("#fiction").checked) this.fiction = "Fiction";
    if (node.querySelector("#non-fiction").checked)
      this.fiction = "Non-Fiction";
  } else if (node.className === "dialog-read") {
    if (node.querySelector("#dialog-read").checked) this.read = true;
  } else {
    inputNode = node.lastElementChild;
    if (inputNode.value) this[inputNode.id] = inputNode.value;
  }
}

function validateInput() {
  if (INPUTFORM.checkValidity()) {
    createBook();
    closeDialog();
  }
}

function closeDialog() {
  INPUTFORM.reset();
  DIALOG.close();
}
