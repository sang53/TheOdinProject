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
        price: "$20",
        read: true
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
        price: "$25",
        read: true
    }
];
const myLibrary = new Map();
const CONTENT = document.querySelector(".content");
const BOOK_TEMPLATE = CONTENT.querySelector(".book-template");

initialiseLibrary();

document.addEventListener("click", handleClickEvent);

function Book(title, author, year, fiction, genre, series, pages, score, price, read) {
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

    addBook(this);
}

function initialiseLibrary() {
    savedBooks.forEach(addBook)
}

function addBook(book) {
    const node = BOOK_TEMPLATE.cloneNode(true);
    
    for ([key, value] of Object.entries(book)) {
        childNode = node.querySelector(`.${key}`);

        if (key === "read") {
            if (value === true) childNode.querySelector(".checkbox_hidden").checked = true;
        }
        else {
            childNode.innerText += value;
        }
    }
    node.classList.toggle("hidden");
    CONTENT.appendChild(node);
    myLibrary.set(node, book);
}

function handleClickEvent(event) {
    if (event.target.className === "checkbox_hidden") {
        toggleChecked(getBookNode(event.target.parentElement));
    }
    else if (event.target.getAttribute("class") === "remove-book") {
        removeBook(getBookNode(event.target.parentElement));
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

function getData() {

}

function addDefaultValues() {

}